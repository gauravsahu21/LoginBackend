export default function accessibility(
  permissions,
  method,
  url,
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
      GET: permissions?.users?.view,
      POST: permissions?.users?.addEdit,
      DELETE: permissions?.users?.delete,
    },
    catalogues: {
      GET: permissions?.catalogues?.view,
      POST: permissions?.catalogues?.addEdit,
      DELETE: permissions?.catalogues?.delete,
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
      GET: permissions?.queries?.view,
      POST: permissions?.queries?.addEdit,
      DELETE: permissions?.queries?.delete,
    },
    videos: {
      GET: permissions?.videos?.view,
      POST: permissions?.videos?.addEdit,
      DELETE: permissions?.videos?.delete,
    },
    applicants: {
      GET: permissions?.applicants?.view,
      POST: permissions?.applicants?.addEdit,
    },
    images: {
      GET: permissions?.images?.view,
      POST: permissions?.images?.addEdit,
    }
  };
  if (!mappings[url]) {
    console.error(`Route not found in metadata for URL: ${url}`);
    return null; 
  }

  // Check if the method is supported for the given URL
  if (!mappings[url][method]) {
    console.error(`Method not supported for URL: ${url}, Method: ${method}`);
    return null; // Return null to indicate that the method is not supported
  }

  // Return the corresponding permission
  return mappings[url][method];
}
