"undefined"==typeof TaskExecuter&&(TaskExecuter={});
(function(){var a=[],b=null;TaskExecuter.execute=function(){0!=a.length?(b=a.pop(),b.execute()):setTimeout(TaskExecuter.execute,500)};TaskExecuter.addTask=function(c){a.push(c)};TaskExecuter.reExecute=function(){b.execute()};TaskExecuter.createTask=function(c,e,f){return{cycleTime:c,cycleTick:e,execute:f,isStop:!1,run:function(){this.isStop||(this.cycleTick=this.cycleTime,TaskExecuter.addTask(this))},check:function(){if(!(0>this.cycleTick)){var d=this;0==this.cycleTick?(this.cycleTick=-1,setTimeout(function(){d.run()},
10)):0<this.cycleTick&&(this.cycleTick--,setTimeout(function(){d.check()},1E3))}},refresh:function(){this.cycleTick=0},stop:function(){this.isStop=!0}}}})();

