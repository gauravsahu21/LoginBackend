import UserService from "src/api/service/user.service";
import UserController from "../../../api/controller/user.controller";
import UserRepository from "src/db/repository/user.repository";

// beforeAll(async () => {
//     const data = await setupAppAndFactory();
//     app = data.app;
//     fakeFactory = data.fakeFactory;
//     userController = app.get(UserController);
//     userService = app.get(UserController);
//     location = await LocationDataEntity.findOneBy({ countryName: 'India' });
//     validSignupCreds = {
//         email: 'Demo@gmail.com',
//         mobile: '+918796059605',
//         currentLocation: { ...location },
//         password: '123456',
//         name: 'Demo',
//         userRelation: UserRelation.Self,
//         lookingFor: Gender.Female,
//         profileName: 'Demo User',
//         religion: ReligionType.Hindu,
//         age: 25,
//     };
//     await fakeFactory.deleteAll();
// });
let userController: UserController;
let userService: UserService;
let userRepository: UserRepository;

beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
});

describe('User controller : Login', () => {
    it('login with valid credentials', async () => {
        const loginCreds = {
            userid: "kane@vp",
            password: "user@123"
        };
        const res = await userController.loginUser(loginCreds);
        console.log(res);
        expect(res.httpCode).toBe(200);
        expect(res.data.token).toBeTruthy();
        expect(res.data.user).toBeTruthy();
    });

    it('login with invalid credentials', async () => {
        const loginCreds = {
            userid: "kane@vp",
            password: "user@123"
        };
        const res = await userController.loginUser(loginCreds);
        console.log("2",res)
        expect(res.httpCode).toBe(200);
        expect(res.data.token).toBeTruthy();
        expect(res.data.user).toBeTruthy();
        expect(res.httpCode).toBe(400);
        expect(res.message.includes('not matching')).toBeTruthy();
    });
})

