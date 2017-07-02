which -s brew
if [[ $? != 0 ]] ; then
    echo You need to have \"homebrew\" installed to proceed.
    echo You can install it via this command:
    echo 'ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
    exit 1;
fi

VM_NAME=asldev
VM_DISKSIZE=8000
VM_CPUS=2
VM_MEMORY=4112
VM_NETWORK=192.168.123.1/24

if brew ls --versions docker-machine > /dev/null; then
  echo "The docker-machine package is already installed."
else
  echo "Installing docker-machine via homebrew."
  brew install docker-machine
fi

if docker-machine ls -q | grep "^$VM_NAME$" > /dev/null; then
    echo "Docker machine $VM_NAME already exists; exiting."
    exit 0
fi

echo ----------------------------------------
echo Creating virtual machine for dockers
echo ----------------------------------------

docker-machine create $VM_NAME \
  --driver virtualbox \
  --virtualbox-disk-size "$VM_DISKSIZE" \
  --virtualbox-cpu-count $VM_CPUS \
  --virtualbox-memory $VM_MEMORY \
  --virtualbox-hostonly-cidr "$VM_NETWORK"

eval $(docker-machine env $VM_NAME)

echo ----------------------------------------
echo Building docker images
echo ----------------------------------------

docker-compose build

echo ----------------------------------------
echo Running docker containers in background
echo ----------------------------------------

docker-compose up -d

echo ----------------------------------------
echo Waiting 10 seconds to allow mysql to
echo start up.
echo ----------------------------------------

sleep 10

echo ----------------------------------------
echo Running db migration scripts
echo ----------------------------------------

./bin/migrate

echo ----------------------------------------
echo Do not forget to run this command to 
echo activate the right docker environment:
echo . asl
echo ----------------------------------------

