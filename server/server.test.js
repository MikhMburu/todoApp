const expect = require("expect");
const request = require("supertest");

const {app, ToDo, User} = require("./server");
// const {todoSchema} = require("../schema/todo");
// const {userSchema} = require("../schema/users");

beforeEach(done=>{
    ToDo.deleteMany({}).then(()=>done())
});
describe("POST /todos", ()=>{
    it("..should create a new todo",(done)=>{
        var text = "Test todo text..";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }

            ToDo.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[todos.length-1].text).toBe(text);
                done();
            }).catch((e)=>done(e))
        })
    });
   
});