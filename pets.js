let fs = require("fs");

let option = process.argv[2];

switch(option) {
    case 'read':
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            let pets = JSON.parse(data)
            if(process.argv[3] < 0 || process.argv[3] > pets.length - 1){
                console.log(`Pet index out of range`)
            } else if (pets[process.argv[3]] === undefined){
                console.log(pets)
            } else {
                console.log(pets[process.argv[3]])
            }
        })
        break;
    case 'create':
        fs.readFile("pets.json", "utf-8", (error, data) => {
          let pets = JSON.parse(data)
          //console.log(pets)
          let age = process.argv[3]
          age = parseInt(age)
          let kind = process.argv[4]
          let name = process.argv[5]
          let newPet = {age: age, kind: `${kind}`, name: `${name}`}
          pets.push(newPet)
          console.log(pets)
        });
        break;
    case 'update':
        console.log('you selected update')
        break;
    case 'destroy':
        console.log('you selected destroy')
        break;
    default:
        console.log("Usage: node pets.js [read | create | update | destroy]")
}

