import mongoose from 'mongoose';
import routedata from '../config/routedata';

let Schema = mongoose.Schema;

let PopeyeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        unique: true,
        trim: true,
        maxLength: [10, 'Store ID must be less than 10 chars']
    },
    route: {
        type: {
            type: String,
            default: "Feature"
        },
        properties: {
            type: Schema.Types.Mixed, 
            default: {}
        },
        geometry: {
            type : {
                type: String,
                required: [true, 'Coordinates are required'],
                default: 'LineString'
            },
            coordinates: Array
        }
    }
}, { retainKeyOrder: true, minimize: false });



// Sets the created_at parameter equal to the current time
PopeyeSchema.index({geometry : '2dsphere'});
const PopeyeRoutes = mongoose.model('popeye', PopeyeSchema);

const importData = () => {
    PopeyeRoutes.create(routedata, (err, routes) => {
        if(err) return console.error(err);
        console.log('%c%s', 'color: #1d5673', 'Data was successfully inported', routes);
    });
}

PopeyeRoutes.find({}).then(function(data, error) {
    if(error) return console.log(error);

    if(data.length) {
        PopeyeRoutes.deleteMany({}).then((dataDeleted, deleteErr) => {
            if(deleteErr) console.log(deleteErr);
            console.log('data was successfully deleted >> ', dataDeleted);
            importData();
        })
    }

    // insert when not data found
    if(!data.length) {
        importData();
    }
})

export default PopeyeRoutes;