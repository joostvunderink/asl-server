# Ingredients

* VirtualBox
* Docker

# Installation: MacOS

Once you have homebrew and VirtualBox installed, simply run bin/macos-install.sh to install
the dockers for asl-server and a mysql database.

All information below is to help understand what the install script does.

# Guide

https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

# Preparation

To create a script to set up docker to use your environment:

* echo 'eval $(docker-machine env asldev)' > ~/bin/asl
* chmod a+x ~/bin/asl

Install brew if you don't already have it:

* /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Steps

* brew update && brew upgrade --all && brew cleanup && brew prune
* brew install docker-machine
* docker-machine create asldev --driver virtualbox --virtualbox-disk-size "8000" --virtualbox-cpu-count 2 --virtualbox-memory 4112 --virtualbox-hostonly-cidr "192.168.123.1/24"
* . asl # The dot plus space at the start are important! This configures your shell to use the right docker environment.
* docker-compose build
* docker-compose start




