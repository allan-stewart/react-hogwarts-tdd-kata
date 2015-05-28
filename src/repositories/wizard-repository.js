// TODO: Remove these hard-coded entries.
var mockRegisteredCourses = [
  {id: "RUN105", name: "Ancient Runes", startTime: new Date(0,0,0,13), professor: "Bathsheba Babbling", credits: 3 },
  {id: "DDA302-10", name: "Defence Against the Dark Arts", startTime: new Date(0,0,0,10), professor: "Severus Snape", credits: 4 }
];

export default class WizardRepository {

  static getRegisteredCourses() {
    return new Promise(function (resolve /*, reject*/) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {
        // resolve with some mock data
        resolve(mockRegisteredCourses);
      }, 250);
    });
  }

}
