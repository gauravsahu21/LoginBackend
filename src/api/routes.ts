export default function accessibility  (
  permissions: any,
  method: string,
  url: string,
)  {
  const mappings = {
    'brands': {
      GET: permissions['brand']['view'],
      POST: permissions['brand']['addEdit'],
      DELETE: permissions['brand']['delete'],
    },
    'changepassword':{
        POST: true,
        
    },
    'users': {
      GET: permissions['users']['view'],
      POST: permissions['users']['addEdit'],
      DELETE: permissions['users']['delete'],
    },
    'catalogue': {
      GET: permissions['catelogues']['view'],
      POST: permissions['catelogues']['addEdit'],
      DELETE: permissions['catelogues']['delete'],
    },
    'careers': {
      GET: permissions['careers']['view'],
      POST: permissions['careers']['addEdit'],
      DELETE: permissions['careers']['delete'],
    },
    'certificates': {
      GET: permissions['certificates']['view'],
      POST: permissions['certificates']['addEdit'],
      DELETE: permissions['certificates']['delete'],
    },
    // 'contactus': {
    //   GET: permissions['queries']['view'],
    //   POST: permissions['queries']['addEdit'],
    //   DELETE: permissions['queries']['delete'],
    // },
    'videos': {
      GET: permissions['video']['view'],
      POST: permissions['video']['addEdit'],
      DELETE: permissions['video']['delete'],
    },
    // 'applicants': {
    //   GET: permissions['applicants']['view'],
    //   POST: permissions['applicants']['addEdit'],
    //   DELETE: permissions['applicants']['delete'],
    // },
  };
  if(!mappings[url]) return "Route not found in metadata";
  return mappings[url][method];
};
