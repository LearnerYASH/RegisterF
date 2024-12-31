const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'UserManagement',
          title: 'User Master',
          type: 'item',
          icon: 'feather icon-users',
          url: '/users'
        },
        
        {
          id: 'CustomerEnquiry',
          title: 'Customer Enquiry',
          type: 'item',
          icon: 'feather icon-slack',
          url: '/CustomerEnquiry'
        },
        
        {
          id: 'Logout',
          title: 'Logout',
          type: 'item',
          icon: 'feather icon-log-out',
          url: '/Logout'
        }
      ]
    },
  ]
};

export default menuItems;
