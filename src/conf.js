const config = {
	levels: [
	//1
	{
		typeLevel: "formation",
		typeAliens: [0],
		countAlien: 2,
		movementSpeedVX: 1,
		movementSpeedVY: 0,
		alienHP: 1,
		typeBullet: 0
	},
	//2
	{
		typeLevel: "formation",
		typeAliens: [0, 1],
		countAlien: 2,
		movementSpeedVX: 1,
		movementSpeedVY: 0,
		alienHP: 1,
		typeBullet: 0
	},
	//3
	{
		typeLevel: "falling",
		typeAliens: [5],
		countAlien: 60,
		movementSpeedVX: 0,
		movementSpeedVY: 8,
		alienHP: 3,
		typeBullet: 0
	},
	//4
	{
		typeLevel: "snake",
		typeAliens: [6],
		countAlien: 2,
		movementSpeedVX: 2,
		movementSpeedVY: 0.2,
		alienHP: 2,
		typeBullet: 0
	},
	//5	
	{
		typeLevel: "formation",
		typeAliens: [0, 1, 2],
		countAlien: 2,
		movementSpeedVX: 1,
		movementSpeedVY: 0,
		alienHP: 1,
		typeBullet: 0
	},
	//6	
	{
		typeLevel: "falling",
		typeAliens: [5, 3],
		countAlien: 40,
		movementSpeedVX: 0,
		movementSpeedVY: 9,
		alienHP: 3,
		typeBullet: 0
	},
	//7	
	{
		typeLevel: "snake",
		typeAliens: [6, 7],
		countAlien: 3,
		movementSpeedVX: 2.3,
		movementSpeedVY: 0.2,
		alienHP: 2,
		typeBullet: 0
	},
	//8	
	{
		typeLevel: "formation",
		typeAliens: [0, 1, 2],
		countAlien: 3,
		movementSpeedVX: 2,
		movementSpeedVY: 0,
		alienHP: 1,
		typeBullet: 0
	},
	//9	
	{
		typeLevel: "falling",
		typeAliens: [5, 3, 4],
		countAlien: 30,
		movementSpeedVX: 0,
		movementSpeedVY: 10,
		alienHP: 3,
		typeBullet: 0
	},
    //10
	{
		typeLevel: "boss",
		typeAliens: [8],
		countAlien: 1,
		movementSpeedVX: 3,
		movementSpeedVY: 15,
		alienHP: 35,
		typeBullet: 1
	}
	]
}

export { config };
