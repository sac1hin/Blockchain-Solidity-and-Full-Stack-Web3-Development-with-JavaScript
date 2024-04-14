// SPDX-License-Identifier: MIT
// pragma solidity 0.8.19;

// contract HelloWorld {
//     // boolean, unit, int, address, bytes, bytes
//     bool hasFavNumber = true;
//     uint256 favnumber = 123;
//     string favnumberText = "Five";
//     int256 favInt = -5;
//     address myAddress = 0x83DD842BB14aacE72A1a68a129D134Ee3EeBbbd4;
//     bytes32 faveBytes = "cat";
// }

// struct
contract SimpleStorage {
    uint256 public favouriteNumber;
    People public people = People({favouriteNumber:2,name:"sac"});

    struct People{
        uint256 favouriteNumber;
        string name;
    }

    function set(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function something() public pure returns (uint256){
        return (1+1) ;
    }

    function get() public view returns (uint256){
        return favouriteNumber;
    }
}

// array example
// SPDX-License-Identifier: MIT

// array and struct
contract SimpleStorage {
    struct People {
        uint256 favouriteNumber;
        string name; ./'
    }

    // any size
    People[] public people;

    // limited size = 3
    // People[3] public people;

    function addPerson(string memory _name, uint256 _favNum) public {
        People memory newPerson = People({
            favouriteNumber: _favNum,
            name: _name
        });
        people.push(newPerson);
    }
}

// mapping (keytype=> valuetype)
contract SimpleStorage {

    mapping (string => uint256) public nameToFaveNumber;

    struct People{
        string name;
        uint256 favNumber;
    }

    People[] public people;

    function addPerson(string memory _name,uint256 _favNum) public {
        people.push(People(_name,_favNum));
        nameToFaveNumber[_name] = _favNum;
    }
}