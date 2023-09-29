export default function accessibility(
  permissions: any,
  method: string,
  url: string,
) {
  const mappings = {
    brands: {
      GET: permissions?.brands?.view,
      POST: permissions?.brands?.addEdit,
      DELETE: permissions?.brands?.delete,
    },
    changepassword: {
      POST: true,
    },
    users: {
      GET: permissions['users']['view'],
      POST: permissions['users']['addEdit'],
      DELETE: permissions['users']['delete'],
    },
    catalogues: {
      GET: permissions['catalogues']['view'],
      POST: permissions['catalogues']['addEdit'],
      DELETE: permissions['catalogues']['delete'],
    },
    careers: {
      GET: permissions?.careers?.view,
      POST: permissions?.careers?.addEdit,
      DELETE: permissions?.careers?.delete,
    },
    certificates: {
      GET: permissions?.certificates?.view,
      POST: permissions?.certificates?.addEdit,
      DELETE: permissions?.certificates?.delete,
    },
    queries: {
      GET: permissions['queries']['view'],
      POST: permissions['queries']['addEdit'],
      DELETE: permissions['queries']['delete'],
    },
    videos: {
      GET: permissions['videos']['view'],
      POST: permissions['videos']['addEdit'],
      DELETE: permissions['videos']['delete'],
    },
    applicants: {
      GET: permissions['applicants']['view'],
      POST: permissions['applicants']['addEdit'],
    },
  };
  if (!mappings[url]) return 'Route not found in metadata';
  return mappings[url][method];
}
