const si = require('systeminformation');
var apm = require('elastic-apm-node');

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
        avg:os.loadavg(),
        ncpu:os.cpus().length
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
  {
    iface: 'enp3s0',
    operstate: 'up',
    rx: 1940086186,
    tx: 94073626,
    rx_sec: 533.0305476752105,
    tx_sec: 415.7018568548478,
    ms: 221719
  }
  */
  si.networkInterfaces().then((intf)=>si.networkStats(intf[1].iface));
  si.networkInterfaces().then(ifcs=>ifcs.filter((ifc)=>ifc.iface!=='lo').forEach(ifc=>si.networkStats(ifc.iface)));

}
