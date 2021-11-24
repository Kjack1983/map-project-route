import chai from 'chai';
const { expect } = chai;
const should = chai.should();
import mongoose from 'mongoose';
import request from "supertest";
import Popeye from '../models/popeye';
import app from '../app';
import chaiHttp from 'chai-http';
import "babel-polyfill";
chai.use(chaiHttp);

let routeId = '';

const checkReponseObj = (res, done) => {
	res.should.have.status(200);
	expect(res.body).should.be.a('object');

	let { _id, name, route } = res.body;

	routeId = _id; 

	let { type, properties, geometry } = route;
	let {
		geometry: {
			type: coordinateType,
			coordinates
		}
	} = route;

	let actualCorninatesResult = [
		[14.495279788970945, 35.915087047076575],
		[14.495869874954222, 35.91489588560945]
	]

	// Assertetions.
	expect(res.body).to.have.property('name');
	expect(name).to.be.a('string');
	expect(res.body).to.have.property('route');
	expect(route).should.be.a('object');
	expect(route).to.have.property('type');
	expect(type).to.be.a('string');
	expect(route).to.have.property('properties');
	expect(properties).should.be.a('object');
	expect(route).to.have.property('geometry');
	expect(geometry).should.be.a('object');
	expect(geometry).to.have.property('type');
	expect(coordinateType).to.be.a('string');
	expect(geometry).to.have.property('coordinates');
	expect(coordinates).to.be.a('array');
	expect(actualCorninatesResult).to.deep.equal(coordinates);
	done();
}

//Our parent block
describe('TEST POPEYE ROUTES', () => {
	// Remove this block of code if we want to remove routes from db.
	// off course then we need to check the length of the response eql(0)
	// res.body.length.should.be.eql(0);
	/* beforeEach((done) => {
		Popeye.remove({}, (err) => {
		   done();
		});
	}); */

	/*
	* Test the /GET/ routes
	*/
	describe('/GET popeyes routes', () => {
		it('it should GET all the routes', (done) => {
			chai.request(app)
				.get('/api/popeye')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.should.to.be.json;
					expect(res.body).to.be.a('array');
					done();
				});
		})
	})

	/*
	* Test the /POST/:id route
	*/
	describe('/POST popeyes routes', () => {
		it('it should POST a route ', (done) => {
			let Route = {
				"name": "somename",
				"route": {
					"type": "Feature",
					"properties": {
						"color": "#33C9EB"
					},
					"geometry": {
						"type": "LineString",
						"coordinates": [
							[14.495279788970945, 35.915087047076575],
							[14.495869874954222, 35.91489588560945]
						]
					}
				}
			}
			chai.request(app)
				.post('/api/popeye')
				.send(Route)
				.end((err, res) => {
					if (err) done(err);
					checkReponseObj(res, done);
				});
		});
	});

	/*
	* Test the /GET/:id route
	*/
	describe('/GET/:id route', () => {
		it('it should GET a route by the given id', (done) => {
			chai.request(app)
				.get(`/api/popeye/${routeId}`)
				.end((err, res) => {
					if (err) done(err);
					checkReponseObj(res, done);
				});
		});
	});

	/*
	* Test the /PUT/:id route
	*/
	describe('/UPDATE/:id route', () => {
		it('it should UPDATE a route by the given id', (done) => {
			let updatePopeyeRoute = {
				"name": "newName",
				"route": {
					"type": "Feature",
					"properties": {
						"color": "#33C9EB"
					},
					"geometry": {
						"type": "LineString",
						"coordinates": [
							[14.495279788970945, 35.915087047076575],
							[14.495869874954222, 35.91489588560945]
						]
					}
				}
			};

			Popeye.findByIdAndUpdate({_id: routeId}, updatePopeyeRoute).then(route => {
				Popeye.findOne({_id: route._id}).then(nestedRoute => {
					chai.request(app)
					.put(`/api/popeye/${nestedRoute._id}`)
					.end((err, res) => {
						if (err) done(err);
						checkReponseObj(res, done);
					});
				})
			});
		});
	});


	/*
	* Test the /DELETE/:id route
	*/
	describe('/DELETE/:id route', () => {
		it('it should DELETE a route by the given id', (done) => {
			chai.request(app)
			.delete(`/api/popeye/${routeId}`)
			.end((err, res) => {
				if (err) done(err);
				res.should.have.status(200);
				res.should.to.be.json;
			});
			done();
		});
	});
});