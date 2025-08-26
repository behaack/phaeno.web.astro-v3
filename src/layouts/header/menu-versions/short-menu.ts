export interface IMenuItem {
  index: number,
  label: string,
  path: string
  submenu: IMenuItem[] | null
}

const menu: IMenuItem[] = [
  {
    index: 0,
    label: 'Home',
    path: '/',
    submenu: null
  },
  {
    index: 1,
    label: 'Technology',
    path: '/technology',
    submenu: null
  },
  {
    index: 3,
    label: 'About',
    path: '/about',
    submenu: [
      {
        index: 3.1,
        label: 'About Us',
        path: '/about/about-us',
        submenu: null
      },
      {
        index: 3.2,
        label: 'Job Openings',
        path: '/about/job-openings',
        submenu: null
      }      
    ]
  },
  {
    index: 2,
    label: 'Contact',
    path: '/contact',
    submenu: null
  },  
]

export default menu
