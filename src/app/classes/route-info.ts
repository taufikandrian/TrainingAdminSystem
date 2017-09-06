import { IRouteInfo } from './iroute-info';

const routeDashboard    = { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' };
const routePeriod       = { path: '/periods', title: 'Periods',  icon:'calendar', class: '' };
const routeUser         = { path: '/users', title: 'Users',  icon:'users', class: '' };
const routeEnrollments  = { path: '/enrollments', title: 'Enrollments',  icon:'edit', class: '' };
const routeAchievement  = { path: '/achievements', title: 'Achievements',  icon:'diamond', class: '' };
const routeTraining     = { path: '/trainings', title: 'Trainings',  icon:'settings', class: '' };

export const allRoutes: IRouteInfo[] = [
  routeDashboard,
  routePeriod,
  routeUser,
  routeEnrollments,
  routeAchievement,
  routeTraining
];

export const trainerRoutes: IRouteInfo[] = [
  routeDashboard,
  routePeriod,
  routeEnrollments,
  routeAchievement,
  routeTraining
];

export const managerRoutes: IRouteInfo[] = [
  routeDashboard,
  routePeriod,
  routeEnrollments,
  routeAchievement,
];

export const staffRoutes: IRouteInfo[] = [
  routeDashboard,
  routePeriod,
  routeEnrollments,
  routeAchievement,
];
