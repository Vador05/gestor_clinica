/*
@license
dhtmlxScheduler v.5.1.1 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.attachEvent("onTemplatesReady",function(){scheduler.xy.scroll_width=0;var e=scheduler.render_view_data;scheduler.render_view_data=function(){var t=this._els.dhx_cal_data[0];t.firstChild._h_fix=!0,e.apply(scheduler,arguments);var a=parseInt(t.style.height);t.style.height="1px",t.style.height=t.scrollHeight+"px",this._obj.style.height=this._obj.clientHeight+t.scrollHeight-a+"px"};var t=scheduler._reset_month_scale;scheduler._reset_month_scale=function(e,a,r,n){var i={clientHeight:100};t.apply(scheduler,[i,a,r,n]),
e.innerHTML=i.innerHTML}});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_monthheight.js.map