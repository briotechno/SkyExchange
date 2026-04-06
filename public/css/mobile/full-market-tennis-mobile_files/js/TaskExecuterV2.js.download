"undefined"==typeof TaskExecuterV2&&(TaskExecuterV2={});
(function(){var a=[],b=null;TaskExecuterV2.execute=function(){0!=a.length?(b=a.pop(),b.execute()):setTimeout(TaskExecuterV2.execute,500)};TaskExecuterV2.addTask=function(c){a.push(c)};TaskExecuterV2.reExecute=function(){b.execute()};TaskExecuterV2.createTask=function(c,e,f){return{cycleTime:c,cycleTick:e,execute:f,isStop:!1,run:function(){this.isStop||(this.cycleTick=this.cycleTime,TaskExecuterV2.addTask(this))},check:function(){if(!(0>this.cycleTick)){var d=this;0==this.cycleTick?(this.cycleTick=
-1,setTimeout(function(){d.run()},10)):0<this.cycleTick&&(this.cycleTick-=this.cycleTime,setTimeout(function(){d.check()},1E3*this.cycleTime))}},refresh:function(){this.cycleTick=0},stop:function(){this.isStop=!0}}}})();

