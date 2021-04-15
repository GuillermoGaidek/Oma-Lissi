module.exports = (sequelize,dataTypes)=>{
	let alias = "cabaña";
	let cols = {
		cod_cabaña: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: true,
			autoIncrement: true,
			comment: null,
			field: "cod_cabaña"
		},
		capacidad: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: null,
			primaryKey: false,
			autoIncrement: false,
			comment: null,
			field: "capacidad"
		}
	};
	let config = {
		tableName: "cabañas",
		timestamps: false
	};
	
	const cabaña = sequelize.define(alias,cols,config);
	
	Pelicula.associate=function(models){  //aca van las relaciones. Hay que configurarlo en el codigo de las 2 tablas. En la otra ira lo contrario a esta.
		Pelicula.belongsTo(models.Generos,{
			as: "generos",
			foreignkey: "genre_id"
		})
	}
	
	return cabaña;
}