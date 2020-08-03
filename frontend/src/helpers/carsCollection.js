const bodyTypes = [
    {
        id: 1, 
        name: 'Hatchback'
    },
    {
        id: 2, 
        name: 'Sedan'
    },
    {
        id: 3, 
        name: 'SUV'
    },
    {
        id: 4, 
        name: 'Coupe'
    },
    {
        id: 5, 
        name: 'Convertible'
    },
    {
        id: 6, 
        name: 'Wagon'
    }
]

const CarsCollection = [
    {
        name: 'Audi',
        bodyTypes: [1, 3, 6],
        input1: 'Audi input1 text',
        input2: 'Audi input2 text'
    },
    {
        name: 'BMW',
        bodyTypes: [2, 4, 5],
        input1: 'BMW input1 text',
        input2: 'BMW input2 text'
    },
    {
        name: 'Mercedes',
        bodyTypes: [2, 5, 6],
        input1: 'Mercedes input1 text',
        input2: 'Mercedes input2 text'
    },
    {
        name: 'Honda',
        bodyTypes: [1, 2, 3, 6],
        input1: 'Honda input1 text',
        input2: 'Honda input2 text'
    },
    {
        name: 'Volkswagen',
        bodyTypes: [2,3,4,5,6],
        input1: 'Volkswagen input1 text',
        input2: 'Volkswagen input2 text'
    },
]

export {CarsCollection, bodyTypes}

