const {ethers} = require('hardhat');
const {assert,expect} = require('chai');

describe("SimpleStorage",function(){
    let simpleStorageFactory,simpleStorage;
    beforeEach(async function(){
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })

    it("Should start with a favorite number of 0",async function(){
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(),expectedValue);
    });


    it("Should update when we call store",async function(){
        const expectedValue = '7';
        const transactionResponse = await simpleStorage.store(expectedValue);

        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();

        assert.equal(currentValue.toString(),expectedValue);
    });

    it("Add person to array",async function(){
        const transactionResponse = await simpleStorage.addPerson('sac',69);
        await transactionResponse.wait(1);

        const person = await simpleStorage.people(0);
        assert.equal(person.name,'sac');
        assert.equal(person.favoriteNumber,69);
    })

});