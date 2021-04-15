module.exports = (sequelize,dataTypes)=>{
	let alias = "reservaTieneCabaña";
	let cols = {
		cod_reserva: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: null,
            field: "cod_reserva"
        },
        cod_cabaña: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: true,
            autoIncrement: false,
            comment: null,
            field: "cod_cabaña"
        },
        cant_personas: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "cant_personas"
        },
        fecha_entrada: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fecha_entrada"
        },
        fecha_salida: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: null,
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "fecha_salida"
        }
	};
	let config = {
		tableName: "reserva_tiene_cabaña",
		timestamps: false
	};
	
	const reservaTieneCabaña = sequelize.define(alias,cols,config);
	
	Pelicula.associate=function(models){  //aca van las relaciones. Hay que configurarlo en el codigo de las 2 tablas. En la otra ira lo contrario a esta.
		Pelicula.belongsTo(models.Generos,{
			as: "generos",
			foreignkey: "genre_id"
		})
	}
	
	return reservaTieneCabaña;
}