import ClubRouter                from './api/club/club.router';
import CompetitionMatchRouter    from './api/competition-match/competition-match.router';
import CompetitionRoundRouter    from './api/competition-round/competition-round.router';
import CompetitionRouter         from './api/competition/competition.router';
import CompetitionTeamRouter     from './api/competition-team/competition-team.router';
import CompetitionTemplateRouter from './api/competition-template/competition-template.router';
import CountryRouter             from './api/country/country.router';
import PermissionRouter          from './api/permission/permission.router';
import PersonRouter              from './api/person/person.router';
import RegionRouter              from './api/region/region.router';
import RoleRouter                from './api/role/role.router';
import SeasonRouter              from './api/season/season.router';
import SportRouter               from './api/sport/sport.router';
import TeamRouter                from './api/team/team.router';
import UserRouter                from './api/user/user.router';
import UserRoleRouter            from './api/user-role/user-role.router';


export default function getRouteConfig() {
  return {
    'clubs'                : ClubRouter,
    'competitions'         : CompetitionRouter,
    'competition-matches'  : CompetitionMatchRouter,
    'competition-team'     : CompetitionTeamRouter, // TODO: Many-to-many relationship: how to name the route?
    'competition-rounds'   : CompetitionRoundRouter,
    'competition-templates': CompetitionTemplateRouter,
    'countries'            : CountryRouter,
    'permissions'          : PermissionRouter,
    'persons'              : PersonRouter,
    'regions'              : RegionRouter,
    'roles'                : RoleRouter,
    'seasons'              : SeasonRouter,
    'sports'               : SportRouter,
    'teams'                : TeamRouter,
    'users'                : UserRouter,
    'user-role'            : UserRoleRouter,
  };
}
