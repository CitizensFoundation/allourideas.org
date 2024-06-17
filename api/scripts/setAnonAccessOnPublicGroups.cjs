var models = require("@yrpri/api/models/index.cjs");
var async = require("async");

var reallyDoIt = process.argv[2];

console.log(
  "Setting anon access on public groups: " +
    " reallyDoIt: " +
    reallyDoIt
);

models.Group.findAll({ where: { access: 0 }, attributes:["id","configuration","name"] }).then((groups) => {
  if (groups) {
    console.log("Found groups: " + groups.length);
    async.eachSeries(
      groups,
      (group, callback) => {
        console.log(group.id)
        if (group && group.configuration) {
          console.log(`Group: ${group.id} ${group.name}`)
          if (reallyDoIt === "doit" || (reallyDoIt === "testGroupOne" && group.id === 1)) {
            group.set("configuration.allowAnonymousUsers", true);
            group
              .save()
              .then(function () {
                console.log("Set anon access on group: " + group.id);
                callback();
              })
              .catch(function (error) {
                console.log("Error setting anon access on group: " + group.id);
                callback(error);
              });
          } else {
            console.log("Would set anon access on group: " + group.id);
            console.log(
              `Current value of anon access: ${group.configuration.allowAnonymousUsers}`
            );
            callback();
          }
        } else {
          console.error("Can't find group configuration")
          callback();
        }
      },
      function (error) {
        console.log("Finished");
        process.exit();
      }
    );
  } else {
    console.log("Can't find groups");
    callback("Cant find groups");
  }
});
