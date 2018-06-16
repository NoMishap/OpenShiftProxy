const si = require('systeminformation');
var apm = require('../bin/www');
var log= apm.apm;
var os = require('os');

exports.send=function()
{
    /*system load
  [ 0.84423828125, 0.5849609375, 0.44189453125 ]
  [1,5,15]
  */
  var load= new Promise(function(resolve,reject)
    {
      let load=
      {
        avg: os.loadavg(),
        ncpu: os.cpus().length
      }
      resolve(load);
    });

  /*cpu load
  {
    avgload: 0.48,
    currentload: 4.540867810292633,
  }
  */
  var cpuLoad =  si.currentLoad()

  /*memory load
  {
    total: 12463538176,
    free: 4613128192,
    used: 7849766912,
    active: 4233068544,
    available: 7790964736
  }
  */
  var memLoad=si.mem();

  /*network load
  [ { iface: 'lxdbr0',
      operstate: 'up',
      rx: 559667,
      tx: 5356664,
      rx_sec: 8.356251322191664,
      tx_sec: 39.39073408081235,
      ms: 47270 },
    { iface: 'veth2REFDP',
      operstate: 'up',
      rx: 927923,
      tx: 3981716,
      rx_sec: 104.92913052676116,
      tx_sec: 94.43621747408504,
      ms: 47270 },
    { iface: 'vethQB8262',
      operstate: 'up',
      rx: 27618,
      tx: 831427,
      rx_sec: 0,
      tx_sec: 26.656511805026657,
      ms: 47268 } ]
  */
// var arrofP=  si.networkInterfaces().then(ifcs=>ifcs.filter((ifc)=>ifc.iface!=='lo').map(ifc=>ifc.iface).map(ifc=>si.networkStats(ifc))).then(arr=>Promise.all(arr))
// var arrofP=  si.networkInterfaces().then(ifcs=>ifcs.filter((ifc)=>ifc.iface!=='lo').map(ifc=>ifc.iface).map(ifc=>si.networkStats(ifc))).then(arr=>Promise.all(arr)).then(ifaces=>ifaces.reduce((sum,iface)=>sum=sum+(iface.rx_sec/iface.ms)),0)
  var netLoad=si.networkInterfaces().then(ifcs=>ifcs.filter((ifc)=>ifc.iface!=='lo').map(ifc=>ifc.iface).map(ifc=>si.networkStats(ifc))).then(arr=>Promise.all(arr).then(array=>Object.assign({},array.map(iface=>{return{"tx":iface.tx_sec,"rx":iface.rx_sec}}))))
/*
apm.captureError({
  message: 'Could not find user %s with id %d in the database',
  params: ['Peter', 42]
})
*/
log.captureError({message:"ciao",params: [ram:1,cpu:2]});
  //Promise.all([load,cpuLoad,memLoad,netLoad]).then(([load,cpuLoad,memLoad,netLoad])=>{return{load,cpuLoad,memLoad,netLoad}}).then(obj=>apm.captureError({}));

}
