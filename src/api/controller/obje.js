let obj= {
    brand:{
        view: true,
        addEdit: true,
        delete: true,
    }, // add brand access auth in the function
    careers:{
        view: true,
        addEdit: true,
        delete: true,
    }, 
    catelogues:{
        view: true,
        addEdit: true,
        delete: true,
    }, // add brand access auth in the function
    certificates:{
        view: true,
        addEdit: true,
        delete: true,
    }, 
    queries:{
        view: true,
        addEdit: true,
        delete: true,
    },
    profile:{
        view: true,
        addEdit: true,
        delete: true,
    }, // either admin profile type or the user who is logged in can change his profile so add profileId authentication also
    users:{
        view: true,
        addEdit: true, // profile wala hi authgaurad laga do but access sirf admin ko hi hoga
        delete: true,
    }, 
    video:{
        view: true,
        addEdit: true,
        delete: true,
    },
}