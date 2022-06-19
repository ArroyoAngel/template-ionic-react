
//import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  ellipseOutline,
  stopCircleOutline,
  colorFilterOutline,
} from 'ionicons/icons';

export interface RoutePage {
  title: string;
  url: string;
  icon: string;
  childrens?: Array<RoutePage>;
}

export const appPages: RoutePage[] = [
  /*{
    title: 'About',
    url: '/about',
    icon: ellipseOutline,
    childrens: [
      {
        title: 'Policies',
        url: '/policies',
        icon: stopCircleOutline,
      },
    ]
  },*/
  {
    title: 'App',
    url: '/app',
    icon: ellipseOutline,
    childrens: [
      {
        title: 'Users',
        url: '/users',
        icon: stopCircleOutline,
        childrens: [
          {
            title: 'List',
            url: '/list',
            icon: colorFilterOutline,
          }
        ]
      },
      {
        title: 'Menu',
        url: '/menu',
        icon: stopCircleOutline,
      },
    ]
  },
  /*{
    title: 'Settings',
    url: '/settings',
    icon: ellipseOutline,
    childrens: [
      {
        title: 'Version',
        url: '/version',
        icon: stopCircleOutline,
      },
    ]
  },
  {
    title: 'Users',
    url: '/users',
    icon: ellipseOutline,
    childrens: [
      {
        title: 'Login',
        url: '/login',
        icon: stopCircleOutline,
      },
    ]
  },
  {
    title: 'Error',
    url: '/error',
    icon: ellipseOutline,
  },*/
];

export default appPages;