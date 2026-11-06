let CONTRACTS = [
  {id:'HT-202611-002', customerId:'KH-2026-002', customerName:'林晓', phone:'13800001002', designer:'设计老张', address:'重庆渝北', stage:'设计中', amount:0, due:-1000, days:45, ended:false, lost:false,
    product:'免漆', civil:'已进场', measureDate:'', needMeasure:'是', promise:'', quoteAmount:'', installDate:'', installDays:'', sitePhone:'',
    files:[
      {seq:1, slot:'定金合同', name:'定金合同.png', type:'image/png', url:'', at:'2026-11-05 09:27', by:'老板', remark:'', amount:1000},
      {seq:5, slot:'初测照片', name:'初测照片.png', type:'image/png', url:'', at:'2026-11-05 09:28', by:'老板', remark:'', amount:0},
      {seq:5, slot:'尺寸', name:'尺寸.png', type:'image/png', url:'', at:'2026-11-05 09:28', by:'老板', remark:'', amount:0}
    ],
    factories:[], rectifies:[],
    changes:[{at:'2026-11-05 09:27', by:'老板', what:'记账', from:'未填', to:'项目收款 1000.00'}]},
  {id:'HT-202611-001', customerId:'KH-2026-005', customerName:'吴婷', phone:'13800001005', designer:'设计小王', address:'重庆', stage:'售后', amount:100000, due:0, days:45, ended:false, lost:false, quoteAmount:100000,
    product:'免漆', civil:'已进场', measureDate:'', needMeasure:'是', promise:'', installDate:'2026-10-28', installDays:'3', sitePhone:'13800001005',
    files:[], factories:[
      {name:'渝北板材厂', content:'柜体', amount:42000, promise:'2026-10-12', forecast:'2026-10-12', actual:'2026-10-12', status:'已完工', at:'2026-10-12 11:00'},
      {name:'两江门业', content:'门板', amount:18600, promise:'2026-10-14', forecast:'2026-10-14', actual:'2026-10-14', status:'已完工', at:'2026-10-14 11:00'},
      {name:'巴南石材', content:'台面', amount:15200, promise:'2026-10-16', forecast:'2026-10-19', actual:'2026-10-19', status:'已到货', at:'2026-10-19 11:00'},
      {name:'九龙坡五金', content:'五金', amount:6800, promise:'2026-10-10', forecast:'2026-10-10', actual:'2026-10-10', status:'已到货', at:'2026-10-10 11:00'}
    ], rectifies:[], changes:[]}
];
let LEDGER = [
  {kind:'项目收款', dir:'收款', amount:1000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:5000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:94000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目付款', dir:'付款', amount:20000, subject:'安装费', cost:true, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:1000, subject:'', cost:false, date:'2026-11-05', due:'', project:'HT-202611-002', customer:'', unpaid:false}
];
let EXPENSES = [];
let COMMISSIONS = [];
let RULES = [
  {name:'A类分级积分', value:'150', enabled:true},
  {name:'B类分级积分', value:'100', enabled:true},
  {name:'C类分级积分', value:'50', enabled:true},
  {name:'10万以内分发抽成比例', value:'2.50', enabled:true},
  {name:'超过10万的分发抽成比例', value:'3.00', enabled:true},
  {name:'分发抽成分档线', value:'100000.00', enabled:true},
  {name:'平台分成比例', value:'20.00', enabled:true},
  {name:'毛利率偏高线', value:'55.00', enabled:true},
  {name:'毛利率偏低线', value:'25.00', enabled:true},
  {name:'确认平面天数', value:'7', enabled:true},
  {name:'确认立面天数', value:'5', enabled:true},
  {name:'确认内部结构天数', value:'5', enabled:true},
  {name:'步骤停滞天数', value:'3', enabled:true}
];
let ACCOUNTS = [
  {account:'admin', name:'老板', role:'负责人', status:'已开通', modules:'首页看板、销售管理、项目管理、财务中心、规则设置', locked:true},
  {account:'design', name:'设计小王', role:'设计师', status:'已开通', modules:'首页看板、项目管理'},
  {account:'yanxuan-accept-assist', name:'助理小邓', role:'助理', status:'已开通', modules:'首页看板、销售管理、项目管理'},
  {account:'yanxuan-accept-design', name:'设计老张', role:'设计师', status:'已开通', modules:'首页看板、销售管理、项目管理'},
  {account:'yanxuan-accept-finance', name:'财务小刘', role:'财务', status:'已开通', modules:'首页看板、销售管理、项目管理、财务中心、规则设置'},
  {account:'yanxuan-accept-install', name:'安装师傅老赵', role:'安装队', status:'已开通', modules:'首页看板、项目管理'},
  {account:'yanxuan-accept-off', name:'停用账号', role:'销售', status:'未开通', modules:'首页看板、销售管理、项目管理、财务中心、规则设置'},
  {account:'yanxuan-accept-pm', name:'项目经理小张', role:'项目经理', status:'已开通', modules:'首页看板、销售管理、项目管理、财务中心'},
  {account:'yanxuan-accept-sales', name:'销售小李', role:'销售', status:'已开通', modules:'首页看板、销售管理、项目管理、财务中心'}
];
const MODULE_OPTIONS = ['首页看板','销售管理','项目管理','财务中心','合作伙伴','规则设置'];
const ROLE_MODULES = {负责人:MODULE_OPTIONS, 设计师:['首页看板','项目管理'], 助理:['首页看板','销售管理','项目管理'], 财务:['首页看板','销售管理','项目管理','财务中心','规则设置'], 安装队:['首页看板','项目管理'], 销售:['首页看板','销售管理','项目管理','财务中心','合作伙伴'], 项目经理:['首页看板','销售管理','项目管理','财务中心']};

function money(n){return Number(n||0).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});}
function ruleValue(name, fallback){const r=RULES.find(x=>x.name===name);if(!r||!r.enabled)return fallback;const n=Number(r.value);return Number.isFinite(n)?n:fallback;}
function pageShell(html){
  document.getElementById('mobileSticky').classList.remove('show');
  document.querySelector('.content').classList.remove('detail-page');
  document.getElementById('content').innerHTML=html;
}
function openModule(title, body, onOk){
  document.getElementById('moduleTitle').textContent=title;
  document.getElementById('moduleBody').innerHTML=body;
  const ok=document.getElementById('moduleOk');
  ok.textContent='确定';
  ok.disabled=false;
  ok.onclick=()=>{if(onOk()!==false)closeModal('moduleModal');};
  openModal('moduleModal');
}
function fieldError(id, msg){
  const el=document.getElementById(id);if(!el)return;
  el.classList.add('has-error');
  const err=el.querySelector('.form-error');if(err)err.textContent=msg||err.textContent;
}
function clearField(id){const el=document.getElementById(id);if(el)el.classList.remove('has-error');}

function isUntouched(c){return c.status!=='已流失' && !(c.follows&&c.follows.length) && !(c.contactNote&&String(c.contactNote).trim());}
function customerSigned(c){return c.status==='已成交' || c.boardStage==='已成交' || CONTRACTS.some(p=>p.customerId===c.id && !p.lost && !p.ended);}
function todayItems(){
  const items=[];
  customers.forEach(c=>{
    if(c.status==='已流失'||c.boardStage==='流失'||customerSigned(c)) return;
    if(isUntouched(c)) items.push({group:'customer', kind:'未首触', title:c.name, sub:`${c.id} · ${fmtPhone(c.phone)} · ${c.wechat} · ${c.city} · ${c.channel} · ${gradeLabel(c.intent)} · ${c.boardStage}`, detail:'还没有通话，也没有加微信。', owner:c.owner||'老板', view:'detail', id:c.id});
    if(c.nextFollow && c.nextFollow.slice(0,10)<TODAY) items.push({group:'customer', kind:'逾期跟进', title:c.name, sub:`${c.id} · 下次跟进 ${c.nextFollow}`, detail:'已过约定的跟进时间。', owner:c.owner||'老板', view:'detail', id:c.id});
  });
  CONTRACTS.forEach(p=>{
    if(p.ended||p.lost) return;
    if(p.action && p.action.status!=='已完成'){
      const cur=currentStep(p);
      const late=cur&&cur.plan&&cur.plan<TODAY?Math.round((new Date(TODAY)-new Date(cur.plan))/86400000):0;
      items.push({group:'project', kind:'项目事项', title:`${p.id} ${p.customerName}`, sub:p.action.name, detail:(late?`超了 ${late} 天。`:'')+(p.action.blocker||'当前这一步还没完成。'), owner:p.designer||'—', view:'project', id:p.id});
    }
  });
  LEDGER.filter(x=>x.unpaid&&x.project).forEach(x=>items.push({group:'project', kind:'待付', title:x.project, sub:`${x.kind} · ${money(x.amount)}`, detail:'这一单还有款没付出。', owner:'财务', view:'finance', id:''}));
  return items;
}
function openWork(view, id){if(view==='detail')goDetail(id);else if(view==='project')goProject(id);else goView('finance');}

function renderHome(){
  const all=todayItems();
  const people=all.filter(t=>t.group==='customer');
  const jobs=all.filter(t=>t.group==='project');
  const s=financeSummary();
  const by=(arr,key)=>Object.entries(arr.reduce((m,x)=>{const k=x[key]||'未定';m[k]=(m[k]||0)+1;return m;},{})).map(([name,n])=>({name,n})).sort((a,b)=>b.n-a.n);
  const high=ruleValue('毛利率偏高线',55);
  const low=ruleValue('毛利率偏低线',25);
  const margins=CONTRACTS.filter(p=>p.amount>0).map(p=>{
    const cost=projectCost(p.id);
    const rate=p.amount?(p.amount-cost)/p.amount*100:0;
    let note='';let cls='';
    if(rate<low){note='毛利率偏低';cls='margin-bad';}
    else if(rate>high){note='成本可能没录全';cls='margin-warn';}
    return {p, cost, rate, note, cls};
  });
  const blocked=CONTRACTS.filter(p=>p.action&&String(p.action.blocker||'').indexOf('还要上传')===0).length;
  pageShell(`
    <div class="page-head">
      <div><h1>首页看板</h1><p>统计截止 ${TODAY}。左边是还没签约的客户，右边是已经立项的项目。点「去处理」进入这个客户或这个项目。没有挂在项目上的日常开支，到财务中心的日常开支里看。</p></div>
      <button class="btn btn-default" onclick="render()">刷新</button>
    </div>
    <div class="kpis">
      <button type="button" class="kpi" onclick="goView('project')"><div class="lab">在途项目</div><div class="val">${s.inFlight}</div><div class="sub">还没到售后</div></button>
      <button type="button" class="kpi" onclick="document.getElementById('homeToday').scrollIntoView({behavior:'smooth',block:'start'})"><div class="lab">待处理</div><div class="val">${all.length}</div><div class="sub">客户 ${people.length} · 项目 ${jobs.length}</div></button>
      <button type="button" class="kpi" onclick="goView('finance')"><div class="lab">本月净额</div><div class="val">${money(s.net)}</div><div class="sub">收入 ${money(s.income)} · 支出 ${money(s.pay)}</div></button>
      <button type="button" class="kpi" onclick="goView('finance')"><div class="lab">待收</div><div class="val">${money(s.due)}</div><div class="sub">${s.dueCount} 个已签项目还没收齐</div></button>
    </div>
    <div class="kpis">
      <button type="button" class="kpi" onclick="goView('finance')"><div class="lab">累计已收款</div><div class="val">${money(s.received)}</div><div class="sub">${s.receivedCount} 条</div></button>
      <button type="button" class="kpi" onclick="goView('finance')"><div class="lab">本月收入</div><div class="val">${money(s.income)}</div><div class="sub">${s.incomeCount} 条</div></button>
      <button type="button" class="kpi" onclick="goView('finance')"><div class="lab">全款未收齐</div><div class="val">${s.unpaidCount}</div><div class="sub">签完合同还没收完</div></button>
      <button type="button" class="kpi" onclick="goView('actions')"><div class="lab">当前卡点</div><div class="val">${blocked}</div><div class="sub">当前步骤还缺文件 · 待发提成 ${money(s.commission)}</div></button>
    </div>
    <div id="homeToday" class="block-title">今天要处理 ${all.length} 条</div>
    <div class="today-split">
      <section class="today-pane"><div class="block-title">未签约客户 ${people.length} 条</div>${todayTable(people,'客户')}</section>
      <section class="today-pane"><div class="block-title">已签约项目 ${jobs.length} 条</div>${todayTable(jobs,'项目')}</section>
    </div>
    <div class="grid-2" style="margin-top:16px">
      ${shareRows('渠道占比', by(customers,'channel'))}
      ${shareRows('分级分布', by(customers.map(c=>({grade:c.intent?c.intent+'级':'未分级'})),'grade'))}
    </div>
    <div class="grid-2" style="margin-top:12px">
      ${shareRows('跟进状态', by(customers,'status'))}
      ${shareRows('阶段分布', by(CONTRACTS,'stage'))}
    </div>
    <div class="block-title">项目毛利</div>
    <p class="page-note">毛利率 =（订单总额 − 成本）÷ 订单总额。低于 ${low}% 标红，高于 ${high}% 写成本可能没录全。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>项目</th><th>阶段</th><th>订单总额</th><th>成本</th><th>毛利率</th><th>说明</th></tr></thead><tbody>
      ${margins.map(m=>`<tr onclick="goProject('${m.p.id}')"><td>${esc(m.p.id)}</td><td>${esc(m.p.stage)}</td><td>${money(m.p.amount)}</td><td>${money(m.cost)}</td><td class="${m.cls}">${m.rate.toFixed(2)}%</td><td>${esc(m.note||'—')}</td></tr>`).join('')||'<tr><td colspan="6">还没有可算毛利率的项目</td></tr>'}
    </tbody></table></div>
  `);
}
function financeSummary(){
  const month=TODAY.slice(0,7);
  const incomeRows=LEDGER.filter(x=>x.dir==='收款'&&x.date.startsWith(month));
  const payRows=LEDGER.filter(x=>x.dir==='付款'&&x.date.startsWith(month));
  const expensePaid=EXPENSES.filter(x=>!x.unpaid&&x.date.startsWith(month));
  const income=incomeRows.reduce((s,x)=>s+x.amount,0);
  const pay=payRows.reduce((s,x)=>s+x.amount,0)+expensePaid.reduce((s,x)=>s+x.amount,0);
  const dueRows=CONTRACTS.map(receivableOf).filter(r=>r&&r.open>0);
  const unpaidProjects=dueRows;
  const pendingCommission=COMMISSIONS.filter(c=>c.status!=='已发');
  return {
    inFlight:CONTRACTS.filter(p=>!p.ended&&!p.lost&&p.stage!=='售后').length,
    unpaidCount:unpaidProjects.length,
    received:LEDGER.filter(x=>x.dir==='收款').reduce((s,x)=>s+x.amount,0),
    receivedCount:LEDGER.filter(x=>x.dir==='收款').length,
    due:dueRows.reduce((s,r)=>s+r.open,0),
    dueCount:dueRows.length,
    income, incomeCount:incomeRows.length,
    pay, payCount:payRows.length+expensePaid.length,
    net:income-pay,
    entryCount:incomeRows.length+payRows.length+expensePaid.length,
    commission:pendingCommission.reduce((s,c)=>s+c.amount,0),
    commissionCount:pendingCommission.length
  };
}

function todayTable(list, who){
  const rows=list.map(t=>`<tr><td>${esc(t.kind)}</td><td><strong>${esc(t.title)}</strong><div class="project-meta">${esc(t.sub)}</div></td><td>${esc(t.detail)}</td><td>${esc(t.owner)}</td><td class="col-ops"><button class="btn btn-sm btn-primary" onclick="openWork('${t.view}','${t.id}')">去处理</button></td></tr>`).join('');
  return `<div class="table-wrap"><table class="data"><thead><tr><th>事项</th><th>${who}</th><th>现在的情况</th><th>该谁处理</th><th class="col-ops">操作</th></tr></thead><tbody>
    ${rows||`<tr><td colspan="5">这块今天没有要处理的</td></tr>`}
  </tbody></table></div><div class="pager"><span class="info">共 ${list.length} 条</span></div>`;
}


const STEP_DEFS = [
  {seq:1, group:'节点判断', name:'收取定金', role:'负责人或销售', slots:['定金合同'], na:false, money:true},
  {seq:2, group:'节点判断', name:'生成项目', role:'系统', slots:[], na:false, auto:true},
  {seq:3, group:'节点判断', name:'判断是否量尺', role:'设计师', slots:[], na:false},
  {seq:4, group:'节点判断', name:'建立项目群', role:'助理', slots:[], na:false},
  {seq:5, group:'节点判断', name:'现场初测', role:'设计师', slots:['初测照片','尺寸'], na:false},
  {seq:6, group:'平面', name:'输出平面图', role:'设计师', slots:['平面图'], na:true},
  {seq:7, group:'平面', name:'客户确认平面', role:'设计师', slots:[], na:false, finish:'confirm'},
  {seq:8, group:'深化', name:'输出立面', role:'设计师', slots:[], na:true},
  {seq:9, group:'深化', name:'客户确认立面', role:'设计师', slots:[], na:false, finish:'confirm'},
  {seq:10, group:'深化', name:'输出深化图', role:'设计师', slots:[], na:true},
  {seq:11, group:'深化', name:'客户确认内部结构', role:'设计师', slots:[], na:false},
  {seq:12, group:'复测下单', name:'预埋', role:'设计师', slots:[], na:true, planLabel:'到场日'},
  {seq:13, group:'复测下单', name:'技术对接', role:'项目经理', slots:[], na:true},
  {seq:14, group:'复测下单', name:'确认腻子完工', role:'项目经理', slots:[], na:false},
  {seq:15, group:'复测下单', name:'现场复测', role:'设计师', slots:[], na:false},
  {seq:16, group:'复测下单', name:'报价调整', role:'设计师或负责人', slots:[], na:false},
  {seq:17, group:'复测下单', name:'最终稿和最终报价单', role:'设计师', slots:[], na:false, finish:'quote'},
  {seq:18, group:'复测下单', name:'客户签字', role:'负责人', slots:[], na:false},
  {seq:19, group:'复测下单', name:'收全款', role:'负责人或销售', slots:[], na:false},
  {seq:20, group:'复测下单', name:'拆单下发', role:'设计师', slots:[], na:false},
  {seq:21, group:'生产安装', name:'工厂生产', role:'项目经理', slots:[], na:true},
  {seq:22, group:'生产安装', name:'到货入库', role:'项目经理', slots:['回传单'], na:true},
  {seq:23, group:'生产安装', name:'齐套清点', role:'项目经理', slots:[], na:false},
  {seq:24, group:'生产安装', name:'安排安装', role:'项目经理', slots:[], na:true, finish:'install'},
  {seq:25, group:'生产安装', name:'安装完成', role:'安装队或项目经理', slots:[], na:true},
  {seq:26, group:'验收', name:'客户验收', role:'负责人', slots:[], na:false},
  {seq:27, group:'验收', name:'售后回访', role:'销售或助理', slots:[], na:true}
];
const FINISH_HINT = {
  7:'完成时要填确认方式和确认日期。微信还要截图或链接。',
  9:'完成时要填确认方式和确认日期。微信还要截图或链接。',
  17:'完成时要填报价金额。客户签字时，合同金额按这份报价写入。',
  18:'完成后按合同金额生成一笔应收。签字前收到的钱冲进这笔应收。',
  19:'未收要先在财务中心结清，才能完成。',
  24:'完成时要填安装日期、预计天数和现场电话。'
};
let stepTick = 0;
var previewJob = null;
function stepNow(){stepTick+=1;return TODAY+' 18:'+String(stepTick).padStart(2,'0');}
function stepDef(seq){return STEP_DEFS.find(d=>d.seq===seq);}
function currentStep(p){return (p.steps||[]).find(s=>s.status!=='已完成'&&s.status!=='不适用')||null;}
function missingSlots(p, step){
  const slots=(stepDef(step.seq).slots)||[];
  return slots.filter(slot=>!(p.files||[]).some(f=>f.seq===step.seq&&f.slot===slot));
}
function blockerOf(p, step){
  const miss=missingSlots(p, step);
  if(miss.length) return '还要上传'+miss.join('、')+'。齐了才能点完成。';
  if((stepDef(step.seq).slots||[]).length) return '文件已经齐了，可以点完成。';
  if(step.seq===19){
    const rec=receivableOf(p);
    if(!rec) return '还没签合同，没有应收款项。';
    if(rec.open>0) return '还有未收 '+money(rec.open)+'。先到财务中心记下收款，再完成这一步。';
    return '应收已经收齐，可以完成这一步。';
  }
  return '可以处理这一步。';
}
function projectGroups(){
  const groups=[];
  STEP_DEFS.forEach(d=>{if(!groups.includes(d.group)) groups.push(d.group);});
  return groups;
}
function groupStats(p){
  return projectGroups().map(g=>{
    const steps=p.steps.filter(s=>stepDef(s.seq).group===g);
    const na=steps.filter(s=>s.status==='不适用');
    const applicable=steps.filter(s=>s.status!=='不适用');
    const done=applicable.filter(s=>s.status==='已完成').length;
    return {name:g, done, total:applicable.length, na};
  });
}
function progressText(p){
  return groupStats(p).map(g=>{
    let text=g.name+' '+g.done+'/'+g.total;
    if(g.na.length) text+='（'+g.na.map(s=>stepDef(s.seq).name+'：不需要').join('；')+'）';
    return text;
  }).join(' · ');
}
function syncProject(p){
  if(!p.steps) return;
  let guard=0;
  while(guard++<5){
    const cur=currentStep(p);
    if(!cur||cur.seq!==2) break;
    cur.status='已完成';cur.by='系统';cur.at=cur.at||(TODAY+' 09:27');cur.note=cur.note||'系统已生成项目';
  }
  p.progress=progressText(p);
  if(p.lost){p.stage='流失';p.action=null;return;}
  const cur=currentStep(p);
  if(!cur){p.action=null;p.stage='售后';return;}
  const def=stepDef(cur.seq);
  const miss=missingSlots(p, cur);
  p.action={name:def.name, group:def.group, status:cur.status||'未开始', needFile:def.slots.length>0, uploaded:miss.length===0, blocker:blockerOf(p, cur)};
  if(def.group==='生产安装') p.stage='生产安装';
  else if(def.group==='验收') p.stage='待验收';
  else p.stage='设计中';
}
function seedSteps(doneUntil, extras){
  extras=extras||{};
  return STEP_DEFS.map(d=>{
    const extra=extras[d.seq]||{};
    const status=extra.status||(d.seq<=doneUntil?'已完成':'未开始');
    const closed=status==='已完成'||status==='不适用';
    return {seq:d.seq, status, plan:extra.plan||'', reason:extra.reason||'', by:closed?(extra.by||'老板'):'', at:closed?(extra.at||'2026-10-15 11:00'):'', note:extra.note||''};
  });
}
function pushChange(p, what, from, to){
  p.changes=p.changes||[];
  p.changes.unshift({at:stepNow(), by:'老板', what, from:from||'未填', to:to||'未填'});
}
function findProject(id){return CONTRACTS.find(x=>x.id===id);}
function markDone(p, step, by, note){
  step.status='已完成';
  step.by=by||'老板';
  step.at=stepNow();
  step.note=note||'';
  if(step.seq===18) p.amount=Number(p.quoteAmount)||0;
  refreshDue(p);
  syncProject(p);
}
function showBlank(v){return v?esc(v):'未填';}
function projectReceived(id){
  return LEDGER.filter(x=>x.project===id&&x.dir==='收款').reduce((s,x)=>s+Number(x.amount),0);
}
function contractSigned(p){
  return !!(p&&(p.steps||[]).some(s=>s.seq===18&&s.status==='已完成'));
}
function refreshDue(p){
  if(!p) return;
  const base=contractSigned(p)?Number(p.amount)||0:0;
  p.due=Math.round((base-projectReceived(p.id))*100)/100;
}
function receivableOf(p){
  if(!contractSigned(p)) return null;
  const amount=Math.round((Number(p.amount)||0)*100)/100;
  const got=Math.round(projectReceived(p.id)*100)/100;
  const open=Math.round((amount-got)*100)/100;
  const step=(p.steps||[]).find(s=>s.seq===18);
  const status=open>0?'未收齐':open<0?'多收':'已收齐';
  return {amount, got, open, status, signedAt:(step&&step.at)||''};
}
function dueLabel(p){
  const rec=receivableOf(p);
  return rec?money(rec.open):'未签约';
}
function arStatusBadge(status){
  const cls=status==='已收齐'?'badge-stage-done':status==='多收'?'badge-stage':'badge-stage-wait';
  return `<span class="badge ${cls}">${esc(status)}</span>`;
}
function contractText(p){
  return contractSigned(p)?money(p.amount):'未签字';
}
function receiptTable(p){
  const rows=LEDGER.filter(x=>x.project===p.id&&x.dir==='收款');
  if(!rows.length) return '<div class="empty-inline">还没有收款</div>';
  const how=contractSigned(p)?'冲减应收':'预收';
  return `<div class="table-wrap"><table class="data"><thead><tr><th>发生日</th><th>金额</th><th>说明</th><th>记法</th></tr></thead><tbody>
    ${rows.map(x=>`<tr><td>${esc(x.date)}</td><td>${money(x.amount)}</td><td>${esc(x.subject||'项目收款')}</td><td>${how}</td></tr>`).join('')}
  </tbody></table></div>`;
}
function receivableSection(p){
  const got=projectReceived(p.id);
  const rec=receivableOf(p);
  if(!rec){
    return `<div class="block-title">应收款项</div>
      <div class="callout">还没签合同，不产生应收。完成「客户签字」之后，按合同金额生成一笔应收，已经收到的定金会冲进去。${got>0?'当前预收 '+money(got)+'。':''}</div>
      ${receiptTable(p)}`;
  }
  const cls=rec.open>0?'risk':rec.open<0?'warn':'ok';
  const tail=rec.open>0?'未收 '+money(rec.open)+'。':rec.open<0?'多收 '+money(-rec.open)+'。':'未收 0.00。';
  return `<div class="block-title">应收款项</div>
    <div class="callout ${cls}">${rec.status}。应收 ${money(rec.amount)}，已收 ${money(rec.got)}，${tail}签字日 ${esc((rec.signedAt||'').slice(0,10)||'—')}。</div>
    ${receiptTable(p)}`;
}
function projectSubnav(active){
  const tabs=[['project','项目'],['actions','待办动作'],['production','生产协同']];
  return `<div class="submod">${tabs.map(([view,label])=>`<button type="button" class="${active===view?'active':''}" onclick="goView('${view}')">${label}</button>`).join('')}</div>`;
}
function renderActions(){
  const filters=['全部','节点判断','平面','深化','复测下单','生产安装','验收'];
  if(!filters.includes(state.actionFilter)) state.actionFilter='全部';
  let list=CONTRACTS.filter(p=>p.action);
  if(state.actionFilter!=='全部') list=list.filter(p=>p.action.group===state.actionFilter);
  const empty=state.actionFilter==='全部'?'当前没有待办动作':'这个筛选下没有待办动作';
  pageShell(`
    <div class="page-head"><div><h1>待办动作</h1><p>每个项目只显示当前这一步。完成或标不适用之后，下一步才会出现。还要上传文件时，完成按钮不可用。</p></div>
      <button class="btn btn-default" onclick="render()">刷新</button></div>
    ${projectSubnav('actions')}
    <p class="page-note">设计类步骤记在立项时指定的设计师名下。</p>
    <div class="mini-tabs">${filters.map(k=>`<button class="filter-tab ${state.actionFilter===k?'active':''}" onclick="state.actionFilter='${k}';render()">${k}</button>`).join('')}</div>
    <div class="table-wrap"><table class="data"><thead><tr><th>项目</th><th>动作</th><th>设计师</th><th>状态</th><th>卡点</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${list.map(p=>`<tr><td>${esc(p.id)}</td><td>${esc(p.action.name)}</td><td>${esc(p.designer)}</td><td>${esc(p.action.status)}</td><td>${esc(p.action.blocker||'—')}</td><td><div class="ops">
        <button class="btn btn-sm btn-default" onclick="goProject('${p.id}')">打开项目</button>
        ${p.action.needFile?`<button class="btn btn-sm btn-default" onclick="openUpload('${p.id}')">上传</button>`:''}
        <button class="btn btn-sm btn-primary" ${p.action.needFile&&!p.action.uploaded?'disabled':''} onclick="openFinish('${p.id}')">完成</button>
      </div></td></tr>`).join('')||'<tr><td colspan="6">'+empty+'</td></tr>'}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${list.length} 条</span></div>
  `);
}
const PKG_PROGRESS={待开工:0,备货中:40,生产中:70,已完工:100,已到货:100};
function pkgProgress(f){return PKG_PROGRESS[f.status]??0;}
function pkgReady(f){return pkgProgress(f)>=100;}
function pkgLate(f){
  if(pkgReady(f)) return false;
  if(f.forecast&&f.forecast<TODAY) return true;
  return !!(f.promise&&f.forecast&&f.forecast>f.promise);
}
function pkgShownStatus(f){return !pkgReady(f)&&f.forecast&&f.forecast<TODAY?'延期':(f.status||'待开工');}
function pkgBadge(f){
  const s=pkgShownStatus(f);
  const cls=s==='延期'?'badge-stage-wait':(pkgReady(f)?'badge-stage-done':(s==='生产中'||s==='备货中'?'badge-stage':'badge-intent-none'));
  return `<span class="badge ${cls}">${esc(s)}</span>`;
}
function pkgReadiness(p){
  const list=p.factories||[];
  if(!list.length) return null;
  return Math.round(list.filter(pkgReady).length/list.length*100);
}
function pkgSlowest(p){
  const list=(p.factories||[]).filter(f=>f.forecast);
  if(!list.length) return null;
  return list.reduce((a,f)=>f.forecast>a.forecast?f:a);
}
function renderProduction(){
  const open=CONTRACTS.filter(p=>!p.lost);
  const packs=[];
  open.forEach(p=>(p.factories||[]).forEach((f,i)=>packs.push(Object.assign({project:p, index:i}, f))));
  const by={};
  packs.forEach(f=>{(by[f.name]=by[f.name]||[]).push(f);});
  const names=Object.keys(by);
  const lateN=packs.filter(pkgLate).length;
  const openPack=packs.filter(f=>!pkgReady(f)).length;
  const filters=['全部','未齐套','还没拆包'];
  if(!filters.includes(state.prodFilter)) state.prodFilter='全部';
  let rows=open;
  if(state.prodFilter==='未齐套') rows=open.filter(p=>(p.factories||[]).length&&pkgReadiness(p)<100);
  if(state.prodFilter==='还没拆包') rows=open.filter(p=>!(p.factories||[]).length);
  pageShell(`
    <div class="page-head"><div><h1>生产协同</h1><p>一个项目可以拆成多包。齐套率是已完工或已到货的包数除以包数。总交期看最慢那个包的预测日，不取平均。</p></div></div>
    ${projectSubnav('production')}
    <div class="kpis">
      <div class="kpi" style="cursor:default"><div class="lab">拆单包</div><div class="val">${packs.length}</div><div class="sub">${names.length} 家工厂</div></div>
      <div class="kpi" style="cursor:default"><div class="lab">还没齐</div><div class="val">${openPack}</div><div class="sub">未完工也未到货</div></div>
      <div class="kpi" style="cursor:default"><div class="lab">延期包</div><div class="val">${lateN}</div><div class="sub">预测已过，或晚于承诺</div></div>
      <div class="kpi" style="cursor:default"><div class="lab">已齐套项目</div><div class="val">${open.filter(p=>pkgReadiness(p)===100).length}</div><div class="sub">包都完工或到货</div></div>
    </div>
    ${names.length?`<div class="factory-grid">${names.map(name=>{
      const list=by[name];
      const late=list.filter(pkgLate).length;
      return `<div class="factory-card"><div class="fh"><b>${esc(name)}</b>${late?`<span class="badge badge-stage-wait">${late} 延期</span>`:`<span class="badge badge-stage-done">正常</span>`}</div>
        <div style="color:var(--text-muted);font-size:12px">在制 ${list.length} 包</div>
        ${list.map(f=>`<div class="pkg-mini" style="cursor:pointer" onclick="goProject('${f.project.id}')"><div style="display:flex;justify-content:space-between;gap:8px"><span><b>${esc(f.project.id)}</b> ${esc(f.content||'')}</span><span>${pkgBadge(f)}</span></div><div class="prog" style="margin-top:6px"><i class="${pkgReady(f)?'ok':pkgLate(f)?'risk':''}" style="width:${pkgProgress(f)}%"></i></div><div style="color:var(--text-muted);margin-top:4px">${esc(f.project.customerName)} · 预测 ${esc(f.forecast||'未填')}</div></div>`).join('')}
      </div>`;
    }).join('')}</div>`:`<div class="callout">还没有拆单包。打开项目详情，点「添加拆单包」。一个项目可以记多条，金额用来对账，不计入项目成本。</div>`}
    <div class="panel"><div class="panel-hd"><h3>齐套看板</h3><span class="meta">按项目 · 点行打开</span></div>
      <div style="padding:12px 16px 0"><div class="filter-tabs">${filters.map(k=>`<button class="filter-tab ${state.prodFilter===k?'active':''}" onclick="state.prodFilter='${k}';render()">${k}</button>`).join('')}</div></div>
      <div class="table-wrap" style="border:none;border-radius:0"><table class="data"><thead><tr><th>项目</th><th>客户</th><th>包数</th><th>齐套率</th><th>缺哪个</th><th>最慢的包</th><th>预测日</th></tr></thead><tbody>
        ${rows.map(p=>{
          const list=p.factories||[];
          const rate=pkgReadiness(p);
          const miss=list.filter(f=>!pkgReady(f)).map(f=>f.content).join('、');
          const slow=pkgSlowest(p);
          const bar=rate==null?'—':`<div style="display:flex;align-items:center;gap:8px"><div class="prog" style="flex:1"><i class="${rate>=100?'ok':rate<60?'risk':'warn'}" style="width:${rate}%"></i></div><span class="phone">${rate}%</span></div>`;
          return `<tr onclick="goProject('${p.id}')"><td>${esc(p.id)}</td><td>${esc(p.customerName)}</td><td>${list.length}</td><td style="min-width:120px">${bar}</td><td>${list.length?(miss||'—'):'还没拆包'}</td><td>${slow?esc(slow.content+' · '+slow.name):'—'}</td><td>${slow?esc(slow.forecast):'—'}</td></tr>`;
        }).join('')||'<tr><td colspan="7">这个筛选下没有项目</td></tr>'}
      </tbody></table></div>
    </div>
  `);
}
function renderProjects(){
  const list=CONTRACTS.filter(p=>state.showEnded||(!p.ended&&!p.lost));
  pageShell(`
    <div class="page-head"><div><h1>项目管理</h1><p>立项之后在这里按 27 个步骤往下走。打开一行是项目详情。</p></div>
      <button class="btn btn-primary" onclick="openCreateProject()">立项</button></div>
    ${projectSubnav('project')}
    <div class="panel"><div class="panel-body">
    <div class="toolbar"><div class="toolbar-left">
      <label class="check-row"><input type="checkbox" ${state.showEnded?'checked':''} onchange="state.showEnded=this.checked;render()" /><span class="check"></span><span class="check-text"><span>看已结束和流失</span></span></label>
    </div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>项目</th><th>客户</th><th>设计师</th><th>客户编号</th><th>电话</th><th>地址</th><th>阶段</th><th>分组进度</th><th>订单总额</th><th>待收</th><th>工期</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${list.map(p=>`<tr onclick="goProject('${p.id}')"><td>${esc(p.id)}</td><td>${esc(p.customerName)}</td><td>${esc(p.designer)}</td><td>${esc(p.customerId)}</td><td class="phone">${fmtPhone(p.phone)}</td><td>${esc(p.address)}</td><td>${stageBadge(p.stage)}</td><td title="${esc(p.progress)}"><span class="ellipsis" style="max-width:220px">${esc(p.progress)}</span></td><td>${money(p.amount)}</td><td>${dueLabel(p)}</td><td>${p.days} 个工作日</td><td onclick="event.stopPropagation()"><button class="btn btn-sm btn-default" onclick="goProject('${p.id}')">打开</button></td></tr>`).join('')||'<tr><td colspan="12">没有项目</td></tr>'}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${list.length} 条</span></div>
    </div></div>
  `);
}
function explainStep(p, step, cur){
  const def=stepDef(step.seq);
  if(step.status==='已完成') return ['已完成', step.by, step.at, step.note].filter(Boolean).join(' · ');
  if(step.status==='不适用') return '不适用'+(step.reason?'：'+step.reason:'');
  const bits=[];
  if(cur&&step.seq===cur.seq) bits.push(blockerOf(p, step));
  else if(cur) bits.push('请先处理「'+stepDef(cur.seq).name+'」。这一步还不能上传，也不能点完成。');
  if(def.slots.length) bits.push('要上传'+def.slots.join('、'));
  if(def.money) bits.push('定金金额可以一起记，填 0 就只保存文件');
  if(FINISH_HINT[step.seq]) bits.push(FINISH_HINT[step.seq]);
  if(def.na) bits.push('可以标不适用，要填原因');
  if(def.auto) bits.push('这一步由系统自动完成');
  if(step.plan&&step.plan<TODAY) bits.push('超了 '+Math.round((new Date(TODAY)-new Date(step.plan))/86400000)+' 天');
  return bits.join(' ');
}
function stepOps(p, step){
  if(p.lost) return '—';
  const cur=currentStep(p);
  if(!cur||cur.seq!==step.seq) return '—';
  const def=stepDef(step.seq);
  if(def.auto) return '系统自动完成';
  const miss=missingSlots(p, step);
  const label=def.planLabel||'计划日';
  return `<div class="step-ops">
    ${def.slots.length?`<button type="button" class="btn btn-sm btn-default" onclick="openUpload('${p.id}')">上传</button>`:''}
    <button type="button" class="btn btn-sm btn-primary" ${miss.length?'disabled':''} onclick="openFinish('${p.id}')">完成</button>
    ${def.na?`<button type="button" class="btn btn-sm btn-default" onclick="openNa('${p.id}')">不适用</button>`:''}
    <button type="button" class="btn btn-sm btn-default" onclick="openPlan('${p.id}')">修改${label}</button>
  </div>`;
}
function renderProjectDetail(){
  const p=findProject(state.projectId);
  if(!p){goView('project');return;}
  if(!p.steps){goView('project');return;}
  if(state.stepFor!==p.id){state.stepFor=p.id;state.stepGroup='全部';}
  const cost=projectCost(p.id);
  const profit=Math.round((Number(p.amount)-cost)*100)/100;
  const rate=Number(p.amount)?(profit/Number(p.amount)*100):0;
  const cur=currentStep(p);
  const stats=groupStats(p);
  const rows=p.steps.filter(s=>state.stepGroup==='全部'||stepDef(s.seq).group===state.stepGroup);
  const files=p.files||[];
  pageShell(`
    <div class="page-head">
      <div><h1>${esc(p.id)} ${stageBadge(p.stage)}</h1>
        <p>${esc(p.customerName)} · ${esc(p.customerId)} · ${cur?esc(stepDef(cur.seq).name):'步骤已走完'}</p></div>
      <div class="detail-actions">
        <button class="btn btn-default" onclick="goView('project')">返回项目</button>
        <button class="btn btn-primary" onclick="goDetail('${p.customerId}')">打开客户</button>
      </div>
    </div>
    <div class="dchips">
      <div class="dchip"><span class="k">当前步骤</span><span class="v">${cur?esc(stepDef(cur.seq).name):'已走完'}</span></div>
      <div class="dchip ${receivableOf(p)&&receivableOf(p).open>0?'risk':'ok'}"><span class="k">${contractSigned(p)?'未收':'预收'}</span><span class="v">${contractSigned(p)?dueLabel(p):money(projectReceived(p.id))}</span></div>
      <div class="dchip"><span class="k">合同金额</span><span class="v">${contractText(p)}</span></div>
      <div class="dchip ${rate>0&&rate<25?'risk':''}"><span class="k">毛利率</span><span class="v">${rate.toFixed(1)}%</span></div>
      <div class="dchip"><span class="k">工期</span><span class="v">${p.days} 天</span></div>
    </div>
    <div class="tl">${groupStats(p).map(g=>{
      const names=projectGroups();
      const curG=cur?stepDef(cur.seq).group:'';
      const i=names.indexOf(g.name);
      const curI=names.indexOf(curG);
      const cls=!cur?'done':(i<curI?'done':i===curI?'now':'');
      return `<div class="tl-step ${cls}"><span class="d"></span><span class="n">${esc(g.name)}</span><span class="t">${g.done}/${g.total}</span></div>`;
    }).join('')}</div>
    ${p.lost?`<div class="banner-lost">这个项目已流失。步骤、文件和金额只供查看。收款和增项仍在财务中心记。${p.lostReason?'原因：'+esc(p.lostReason):''}</div>`:`<div class="toolbar"><div class="toolbar-left">
      <button class="btn btn-default" onclick="openSite('${p.id}')">修改现场</button>
      <button class="btn btn-default" onclick="openReconfirm('${p.id}')">重新确认</button>
      <button class="btn btn-default" onclick="openLost('${p.id}')">标流失</button>
      <button class="btn btn-default" onclick="openFactory('${p.id}')">添加拆单包</button>
      <button class="btn btn-default" onclick="openRectify('${p.id}')">打开整改</button>
    </div></div>`}
    <div class="info-grid info-grid-5">
      <div class="info-item"><label>客户</label><div class="val">${esc(p.customerName)}</div></div>
      <div class="info-item"><label>客户编号</label><div class="val">${esc(p.customerId)}</div></div>
      <div class="info-item"><label>电话</label><div class="val">${fmtPhone(p.phone)}</div></div>
      <div class="info-item"><label>地址</label><div class="val">${esc(p.address)}</div></div>
      <div class="info-item"><label>设计师</label><div class="val">${esc(p.designer||'—')}</div></div>
      <div class="info-item"><label>订单总额</label><div class="val">${money(p.amount)}</div></div>
      <div class="info-item"><label>${contractSigned(p)?'未收':'预收'}</label><div class="val">${contractSigned(p)?dueLabel(p):money(projectReceived(p.id))}</div></div>
      <div class="info-item"><label>合同金额</label><div class="val">${contractText(p)}</div></div>
      <div class="info-item"><label>工期</label><div class="val">${p.days} 个工作日</div></div>
      <div class="info-item"><label>承诺日</label><div class="val">${showBlank(p.promise)}</div></div>
      <div class="info-item"><label>产品</label><div class="val">${showBlank(p.product)}</div></div>
      <div class="info-item"><label>土建</label><div class="val">${showBlank(p.civil)}</div></div>
      <div class="info-item"><label>可量尺日</label><div class="val">${showBlank(p.measureDate)}</div></div>
      <div class="info-item"><label>需要量尺</label><div class="val">${showBlank(p.needMeasure)}</div></div>
      <div class="info-item"><label>报价金额</label><div class="val">${p.quoteAmount?money(p.quoteAmount):'未填'}</div></div>
      <div class="info-item"><label>安装日期</label><div class="val">${showBlank(p.installDate)}</div></div>
      <div class="info-item"><label>预计天数</label><div class="val">${p.installDays?esc(p.installDays):'未填'}</div></div>
      <div class="info-item"><label>现场电话</label><div class="val">${p.sitePhone?fmtPhone(p.sitePhone):'未填'}</div></div>
      <div class="info-item"><label>成本</label><div class="val">${money(cost)}</div></div>
      <div class="info-item"><label>毛利</label><div class="val">${money(profit)}</div></div>
      <div class="info-item"><label>毛利率</label><div class="val">${rate.toFixed(2)}%</div></div>
      <div class="info-item"><label>抽成</label><div class="val">${money(0)}</div></div>
    </div>
    ${receivableSection(p)}
    <div class="group-chips">
      <button type="button" class="group-chip ${state.stepGroup==='全部'?'on':''}" onclick="state.stepGroup='全部';render()">全部 <b>${p.steps.filter(s=>s.status==='已完成').length}/${p.steps.length}</b></button>
      ${stats.map(g=>`<button type="button" class="group-chip ${state.stepGroup===g.name?'on':''}" onclick="state.stepGroup='${g.name}';render()">${g.name} <b>${g.done}/${g.total}</b></button>`).join('')}
    </div>
    <p class="page-note">${esc(p.progress)}</p>
    <p class="page-note">步骤按顺序往下走。只有当前这一步能上传、完成或标不适用。没有上传按钮就不用文件。有上传按钮时，缺的文件传齐才能点完成。计划日可以改，预埋改的是到场日。日期过了还没做完，会写超了几天，并出现在首页看板。客户确认平面、客户确认立面要填确认方式；最终报价要填金额；客户签字后按合同金额生成应收；收全款要等未收结清；安排安装要填日期、天数和现场电话。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>步骤</th><th>分组</th><th>岗位</th><th>状态</th><th>计划</th><th>说明</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${rows.map(s=>{
        const def=stepDef(s.seq);
        const cls=cur&&s.seq===cur.seq?'step-now':(s.status==='未开始'?'step-locked':'');
        const plan=s.plan?(s.plan+(s.status==='未开始'&&s.plan<TODAY?' · 超了 '+Math.round((new Date(TODAY)-new Date(s.plan))/86400000)+' 天':'')):'—';
        const status=s.status==='未开始'&&cur&&s.seq===cur.seq?'进行中':s.status;
        return `<tr class="${cls}"><td>${s.seq}. ${esc(def.name)}</td><td>${esc(def.group)}</td><td>${esc(def.role)}</td><td>${esc(status)}</td><td>${esc(plan)}</td><td>${esc(explainStep(p,s,cur))}</td><td>${stepOps(p,s)}</td></tr>`;
      }).join('')}
    </tbody></table></div>
    <div class="section"><div class="section-title">报价和资料</div>
      ${files.length?`<div class="table-wrap"><table class="data"><thead><tr><th>步骤</th><th>文件</th><th>名称</th><th>金额</th><th>时间</th><th class="col-ops">操作</th></tr></thead><tbody>
        ${files.map((f,i)=>{
          const st=p.steps.find(s=>s.seq===f.seq);
          const closed=st&&(st.status==='已完成'||st.status==='不适用');
          return `<tr><td>${esc(stepDef(f.seq).name)}</td><td>${esc(f.slot)}</td><td>${esc(f.name)}</td><td>${f.amount?money(f.amount):'—'}</td><td>${esc(f.at||'—')}</td><td><div class="ops">
            <button type="button" class="btn btn-sm btn-default" onclick="previewProjectFile('${p.id}',${i})">预览</button>
            ${closed?'':`<button type="button" class="btn btn-sm btn-default" onclick="deleteProjectFile('${p.id}',${i})">删除</button>`}
          </div></td></tr>`;
        }).join('')}
      </tbody></table></div>`:'<div class="empty-inline">还没有上传的文件。没有规定文件的步骤不会出现在这里。</div>'}
    </div>
    <div class="section"><div class="section-title">拆单包 <span style="font-weight:400;color:var(--text-muted);font-size:12px">${(p.factories||[]).length?((p.factories||[]).length+' 包 · 齐套 '+pkgReadiness(p)+'%'):'还没拆'}</span></div>
      ${(p.factories||[]).length?`<div class="callout">${(()=>{
        const slow=pkgSlowest(p);
        const lateDone=(p.factories||[]).filter(f=>pkgReady(f)&&f.promise&&f.forecast&&f.forecast>f.promise);
        const bits=['齐套率 '+pkgReadiness(p)+'%。总交期看最慢的包'+(slow?'：'+slow.content+' · '+slow.name+'，预测 '+slow.forecast:'')+'。金额用来对账，不计入项目成本。'];
        if(lateDone.length) bits.push(lateDone.map(f=>f.content+'比承诺晚到 '+f.actual+'。').join(''));
        return esc(bits.join(''));
      })()}</div><div class="table-wrap"><table class="data"><thead><tr><th>包</th><th>工厂</th><th>金额</th><th>承诺</th><th>预测</th><th>实际</th><th>状态</th><th>进度</th><th class="col-ops">操作</th></tr></thead><tbody>
        ${p.factories.map((f,i)=>`<tr><td>${esc(f.content)}</td><td>${esc(f.name)}</td><td>${money(f.amount)}</td><td>${esc(f.promise||'—')}</td><td>${esc(f.forecast||'—')}</td><td>${esc(f.actual||'—')}</td><td>${pkgBadge(f)}</td><td style="min-width:100px"><div class="prog"><i class="${pkgReady(f)?'ok':pkgLate(f)?'risk':''}" style="width:${pkgProgress(f)}%"></i></div></td><td>${p.lost?'—':`<button type="button" class="btn btn-sm btn-default" onclick="openPkgStatus('${p.id}',${i})">改状态</button>`}</td></tr>`).join('')}
      </tbody></table></div>`:'<div class="empty-inline">还没有拆单包。一个项目可以拆多包，点上面的「添加拆单包」。</div>'}
    </div>
    <div class="section"><div class="section-title">整改</div>
      ${(p.rectifies||[]).length?`<div class="table-wrap"><table class="data"><thead><tr><th>事项</th><th>说明</th><th>状态</th><th>时间</th></tr></thead><tbody>
        ${p.rectifies.map(r=>`<tr><td>${esc(r.title)}</td><td>${esc(r.note||'—')}</td><td>${esc(r.status)}</td><td>${esc(r.at)}</td></tr>`).join('')}
      </tbody></table></div>`:'<div class="empty-inline">还没有整改。</div>'}
    </div>
    <div class="section"><div class="section-title">变更记录</div>
      ${(p.changes||[]).length?`<div class="table-wrap"><table class="data"><thead><tr><th>时间</th><th>谁</th><th>事项</th><th>从</th><th>到</th></tr></thead><tbody>
        ${p.changes.map(c=>`<tr><td>${esc(c.at)}</td><td>${esc(c.by)}</td><td>${esc(c.what)}</td><td>${esc(c.from)}</td><td>${esc(c.to)}</td></tr>`).join('')}
      </tbody></table></div>`:'<div class="empty-inline">还没有变更。</div>'}
    </div>
  `);
}
function projectCost(id){return LEDGER.filter(x=>x.project===id&&x.dir==='付款'&&x.cost).reduce((s,x)=>s+x.amount,0);}
function openUpload(id){
  const p=findProject(id);
  const step=p&&currentStep(p);
  if(!p||!step||p.lost) return;
  const def=stepDef(step.seq);
  if(!def.slots.length) return;
  const missing=missingSlots(p, step);
  const picked=missing[0]||def.slots[0];
  const preset=picked==='定金合同'&&p.depositHint?p.depositHint:'';
  openModule('上传「'+def.name+'」', `
    <p class="page-note">${missing.length?esc('还要上传'+missing.join('、')+'。'):'文件已经齐了，可以再换一份。'}完成之前可以多次上传，也可以先关掉，以后再传。下拉框停在还没有的那一份。</p>
    <div class="form-group"><label>文件</label>
      <select class="input select" id="stepSlot" style="width:100%" onchange="onStepSlot()">${def.slots.map(s=>`<option ${s===picked?'selected':''}>${esc(s)}${missing.includes(s)?'（还没有）':''}</option>`).join('')}</select>
    </div>
    <div class="form-group" id="stepAmountBox" style="display:${picked==='定金合同'?'block':'none'}"><label>金额</label>
      <input class="input" id="stepAmount" placeholder="0.00" inputmode="decimal" value="${preset}" />
      <p class="page-note" style="margin:8px 0 0">这次收到的金额，会计入已收。填 0 就只保存文件。</p>
    </div>
    <div class="form-group"><label>选择文件</label>
      <input id="stepFile" type="file" onchange="onStepFile()" />
      <div class="form-error" id="stepFileErr" style="display:block">请选择文件</div>
    </div>
    <div class="form-group"><label>备注 <span id="stepCount">0</span>/255</label>
      <textarea class="input" id="stepRemark" maxlength="255" oninput="document.getElementById('stepCount').textContent=this.value.length" placeholder="写一下这份文件是什么。可以留空。"></textarea>
    </div>
  `, ()=>submitStepFile(id));
  const ok=document.getElementById('moduleOk');
  ok.disabled=true;
}
function onStepSlot(){
  const slot=document.getElementById('stepSlot').value;
  const box=document.getElementById('stepAmountBox');
  if(box) box.style.display=slot.indexOf('定金合同')===0?'block':'none';
}
function onStepFile(){
  const input=document.getElementById('stepFile');
  const file=input&&input.files&&input.files[0];
  const err=document.getElementById('stepFileErr');
  const ok=document.getElementById('moduleOk');
  if(err) err.style.display=file?'none':'block';
  if(ok) ok.disabled=!file;
}
function submitStepFile(id){
  const p=findProject(id);
  const step=p&&currentStep(p);
  if(!p||!step||p.lost) return false;
  const input=document.getElementById('stepFile');
  const file=input&&input.files&&input.files[0];
  if(!file){onStepFile();return false;}
  const slot=document.getElementById('stepSlot').value.replace('（还没有）','');
  const remark=document.getElementById('stepRemark').value.trim();
  let amount=0;
  if(slot==='定金合同') amount=Number(document.getElementById('stepAmount').value)||0;
  if(amount<0){toast('金额不能小于 0');return false;}
  p.files=p.files||[];
  const prev=p.files.find(f=>f.seq===step.seq&&f.slot===slot);
  if(prev&&prev.url) URL.revokeObjectURL(prev.url);
  const rec={seq:step.seq, slot, name:file.name, type:file.type||'', url:URL.createObjectURL(file), at:stepNow(), by:'老板', remark, amount:prev&&prev.amount?prev.amount:amount};
  if(prev) Object.assign(prev, rec);
  else p.files.push(rec);
  if(!prev&&amount>0){
    LEDGER.unshift({kind:'项目收款', dir:'收款', amount, subject:'定金', cost:false, date:TODAY, due:'', project:p.id, customer:'', unpaid:false});
    refreshDue(p);
    pushChange(p,'记账','未填', (contractSigned(p)?'冲减应收 ':'预收 ')+money(amount));
  }
  syncProject(p);
  toast(missingSlots(p, currentStep(p)||step).length?'已上传':'文件已经齐了，可以点完成');
  render();
}
function openFinish(id){
  const p=findProject(id);
  const step=p&&currentStep(p);
  if(!p||!step||p.lost) return;
  const def=stepDef(step.seq);
  const miss=missingSlots(p, step);
  if(miss.length){toast('还要上传'+miss.join('、')+'。齐了才能点完成。');return;}
  if(def.finish==='confirm'){openConfirmFinish(p, step);return;}
  if(def.finish==='quote'){openQuoteFinish(p, step);return;}
  if(def.finish==='install'){openInstallFinish(p, step);return;}
  if(step.seq===18&&!(Number(p.quoteAmount)>0)){toast('还没有最终报价');return;}
  if(step.seq===19){
    const rec=receivableOf(p);
    if(!rec){toast('还没签合同，没有应收款项');return;}
    if(rec.open>0){toast('还有未收 '+money(rec.open)+'。先到财务中心记下收款。');return;}
  }
  openModule('完成', `<p style="margin:0">完成「${esc(def.name)}」？</p>${step.seq===18?'<p class="page-note">确定后按最终报价生成应收款项。已经收到的定金会冲进这笔应收。</p>':''}`, ()=>{
    markDone(p, step, '老板', '');
    pushChange(p,'完成步骤','未开始', def.name);
    if(step.seq===18) toast('已签合同，生成应收 '+money(p.amount));
    else toast(currentStep(p)?'已完成，进入下一步':'这一步已完成');
    render();
  });
}
function openConfirmFinish(p, step){
  const def=stepDef(step.seq);
  openModule('完成「'+def.name+'」', `
    <p class="page-note">确认留痕可以不传。微信确认时，截图和链接有一个即可。当面或电话记下方式和日期。</p>
    <div class="form-group" id="cfMethodGroup"><label>确认方式 <span class="req">*</span></label>
      <select class="input select" id="cfMethod" style="width:100%" onchange="onConfirmMethod()"><option value="">请选择</option><option>微信</option><option>当面</option><option>电话</option></select>
      <div class="form-error">请选择确认方式</div></div>
    <div class="form-group" id="cfDateGroup"><label>确认日期 <span class="req">*</span></label>
      <input class="input" type="date" id="cfDate" /><div class="form-error">请填写确认日期</div></div>
    <div id="cfTrace" style="display:none">
      <div class="form-group" id="cfTraceGroup"><label>确认留痕</label>
        <input type="file" id="cfFile" />
        <input class="input" id="cfLink" placeholder="或者填确认链接" style="margin-top:8px" />
        <div class="form-error">微信确认时，截图和链接有一个即可</div></div>
    </div>
  `, ()=>{
    const method=document.getElementById('cfMethod').value;
    const date=document.getElementById('cfDate').value;
    let ok=true;
    clearField('cfMethodGroup');clearField('cfDateGroup');clearField('cfTraceGroup');
    if(!method){fieldError('cfMethodGroup');ok=false;}
    if(!date){fieldError('cfDateGroup');ok=false;}
    const fileEl=document.getElementById('cfFile');
    const file=fileEl&&fileEl.files&&fileEl.files[0];
    const link=document.getElementById('cfLink').value.trim();
    if(method==='微信'&&!file&&!link){fieldError('cfTraceGroup');ok=false;}
    if(!ok) return false;
    if(file) p.files.push({seq:step.seq, slot:'确认留痕', name:file.name, type:file.type||'', url:URL.createObjectURL(file), at:stepNow(), by:'老板', remark:link, amount:0});
    markDone(p, step, '老板', method+' · '+date+(link?' · '+link:''));
    pushChange(p,'完成步骤','未开始', def.name+' '+method);
    toast('已完成，进入下一步');
    render();
  });
}
function onConfirmMethod(){
  const show=document.getElementById('cfMethod').value==='微信';
  const box=document.getElementById('cfTrace');
  if(box) box.style.display=show?'block':'none';
}
function openQuoteFinish(p, step){
  openModule('完成「最终稿和最终报价单」', `
    <p class="page-note">客户签字时，合同金额按这份报价写入。</p>
    <div class="form-group" id="qAmountGroup"><label>报价金额 <span class="req">*</span></label>
      <input class="input" id="qAmount" placeholder="0.00" inputmode="decimal" value="${p.quoteAmount||''}" />
      <div class="form-error">报价金额要大于 0</div></div>
  `, ()=>{
    const n=Number(document.getElementById('qAmount').value);
    clearField('qAmountGroup');
    if(!(n>0)){fieldError('qAmountGroup');return false;}
    p.quoteAmount=n;
    markDone(p, step, '老板', '报价 '+money(n));
    pushChange(p,'报价','未填', money(n));
    toast('已记下报价，进入下一步');
    render();
  });
}
function openInstallFinish(p, step){
  openModule('完成「安排安装」', `
    <div class="form-group" id="inDateGroup"><label>安装日期 <span class="req">*</span></label><input class="input" type="date" id="inDate" value="${p.installDate||''}" /><div class="form-error">请填写安装日期</div></div>
    <div class="form-group" id="inDaysGroup"><label>预计天数 <span class="req">*</span></label><input class="input" id="inDays" inputmode="numeric" value="${p.installDays||''}" /><div class="form-error">预计天数要是正整数</div></div>
    <div class="form-group" id="inPhoneGroup"><label>现场电话 <span class="req">*</span></label><input class="input" id="inPhone" value="${esc(p.sitePhone||'')}" /><div class="form-error">请填写现场电话</div></div>
  `, ()=>{
    const date=document.getElementById('inDate').value;
    const days=document.getElementById('inDays').value.trim();
    const phone=document.getElementById('inPhone').value.trim();
    let ok=true;
    clearField('inDateGroup');clearField('inDaysGroup');clearField('inPhoneGroup');
    if(!date){fieldError('inDateGroup');ok=false;}
    if(!/^[1-9]\d*$/.test(days)){fieldError('inDaysGroup');ok=false;}
    if(!phone){fieldError('inPhoneGroup');ok=false;}
    if(!ok) return false;
    p.installDate=date;p.installDays=days;p.sitePhone=phone;
    markDone(p, step, '老板', date+' · '+days+'天 · '+phone);
    pushChange(p,'安排安装','未填', date);
    toast('已安排安装');
    render();
  });
}
function openNa(id){
  const p=findProject(id);
  const step=p&&currentStep(p);
  const def=step&&stepDef(step.seq);
  if(!p||!step||p.lost||!def.na) return;
  openModule('不适用', `
    <p class="page-note">这一步标成不适用之后，下一步才会出现。</p>
    <div class="form-group" id="naGroup"><label>原因 <span class="req">*</span></label>
      <textarea class="input" id="naReason" placeholder="请填写原因"></textarea>
      <div class="form-error">请填写原因</div></div>
  `, ()=>{
    const reason=document.getElementById('naReason').value.trim();
    clearField('naGroup');
    if(!reason){fieldError('naGroup','请填写原因');return false;}
    step.status='不适用';step.reason=reason;step.by='老板';step.at=stepNow();
    syncProject(p);
    pushChange(p,'不适用','未开始', def.name+'：'+reason);
    toast('已标为不适用');
    render();
  });
}
function openPlan(id){
  const p=findProject(id);
  const step=p&&currentStep(p);
  const def=step&&stepDef(step.seq);
  if(!p||!step||p.lost||def.auto) return;
  const label=def.planLabel||'计划日';
  openModule('修改'+label+' '+def.name, `
    <p class="page-note">留空就是清掉这一天。日期已过且这一步还没完成，会进首页看板。</p>
    <div class="form-group"><label>${label}</label><input class="input" type="date" id="planDate" value="${step.plan||''}" /></div>
  `, ()=>{
    const v=document.getElementById('planDate').value;
    const prev=step.plan||'未填';
    step.plan=v;
    pushChange(p,'修改'+label, prev, v||'未填');
    syncProject(p);
    toast(v?'已改'+label:'已清掉'+label);
    render();
  });
}
function openSite(id){
  const p=findProject(id);if(!p||p.lost) return;
  const products=['免漆','油漆','混合'];
  if(p.product&&!products.includes(p.product)) products.unshift(p.product);
  openModule('修改现场', `
    <p class="page-note">改土建是否进场、可量尺日、要不要量尺、承诺日和产品。土建未进场时，预计可量尺日要填。已进场可以不填。</p>
    <div class="form-row">
      <div class="form-group"><label>土建</label><select class="input select" id="siteCivil" style="width:100%"><option ${p.civil==='已进场'?'selected':''}>已进场</option><option ${p.civil==='未进场'?'selected':''}>未进场</option></select></div>
      <div class="form-group" id="siteMeasureGroup"><label>可量尺日</label><input class="input" type="date" id="siteMeasure" value="${p.measureDate||''}" /><div class="form-error">土建未进场时，预计可量尺日要填</div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>需要量尺</label><select class="input select" id="siteNeed" style="width:100%"><option ${p.needMeasure!=='否'?'selected':''}>是</option><option ${p.needMeasure==='否'?'selected':''}>否</option></select></div>
      <div class="form-group"><label>承诺日</label><input class="input" type="date" id="sitePromise" value="${p.promise||''}" /></div>
    </div>
    <div class="form-group"><label>产品</label><select class="input select" id="siteProduct" style="width:100%">${products.map(n=>`<option ${n===p.product?'selected':''}>${esc(n)}</option>`).join('')}</select></div>
  `, ()=>{
    const civil=document.getElementById('siteCivil').value;
    const measure=document.getElementById('siteMeasure').value;
    clearField('siteMeasureGroup');
    if(civil==='未进场'&&!measure){fieldError('siteMeasureGroup');return false;}
    const before=[p.civil,p.measureDate,p.needMeasure,p.promise,p.product].join(' / ');
    p.civil=civil;p.measureDate=measure;p.needMeasure=document.getElementById('siteNeed').value;p.promise=document.getElementById('sitePromise').value;p.product=document.getElementById('siteProduct').value;
    const after=[p.civil,p.measureDate||'未填',p.needMeasure,p.promise||'未填',p.product].join(' / ');
    pushChange(p,'修改现场', before, after);
    toast('已修改现场');render();
  });
}
function openReconfirm(id){
  const p=findProject(id);if(!p||p.lost) return;
  const arrived=p.steps.some(s=>s.seq===22&&s.status==='已完成');
  if(arrived){toast('货已到就不能用');return;}
  openModule('重新确认', `
    <p class="page-note">填写原因后，客户签字和后面已完成的动作退回未开始。应收一并撤销，已经收到的钱改记预收。货已到就不能用。</p>
    <div class="form-group" id="rcGroup"><label>原因 <span class="req">*</span></label>
      <textarea class="input" id="rcReason" placeholder="请填写原因"></textarea>
      <div class="form-error">请填写原因</div></div>
  `, ()=>{
    const reason=document.getElementById('rcReason').value.trim();
    clearField('rcGroup');
    if(!reason){fieldError('rcGroup','请填写原因');return false;}
    const signed=p.steps.some(s=>s.seq===18&&s.status==='已完成');
    p.steps.forEach(s=>{
      if(s.seq>=18&&(s.status==='已完成'||s.status==='不适用')){
        s.status='未开始';s.reason='';s.by='';s.at='';s.note='';
      }
    });
    if(signed) p.amount=0;
    refreshDue(p);
    syncProject(p);
    pushChange(p,'重新确认','已完成','退回未开始：'+reason);
    toast('已退回客户签字及后面的步骤');
    render();
  });
}
function openLost(id){
  const p=findProject(id);if(!p||p.lost) return;
  openModule('标流失', `
    <p class="page-note">阶段变成流失。步骤和文件留着，但不能再改。收款和增项仍可记。</p>
    <div class="form-group" id="lostGroup"><label>原因 <span class="req">*</span></label>
      <textarea class="input" id="lostReason" placeholder="请填写原因"></textarea>
      <div class="form-error">请填写原因</div></div>
  `, ()=>{
    const reason=document.getElementById('lostReason').value.trim();
    clearField('lostGroup');
    if(!reason){fieldError('lostGroup','请填写原因');return false;}
    const before=p.stage;
    p.lost=true;p.lostReason=reason;
    syncProject(p);
    pushChange(p,'标流失', before, '流失：'+reason);
    toast('已标为流失');
    render();
  });
}
function openFactory(id){
  const p=findProject(id);if(!p||p.lost) return;
  openModule('添加拆单包', `
    <p class="page-note">一个项目可以拆多包。金额用来对账和提醒打款，不计入项目成本。同一品类也可以再加一条。</p>
    <div class="form-group"><label>包</label><select class="input select" id="facContent" style="width:100%"><option>柜体</option><option>门板</option><option>台面</option><option>五金</option><option>其他</option></select></div>
    <div class="form-group" id="facNameGroup"><label>工厂 <span class="req">*</span></label><input class="input" id="facName" /><div class="form-error">请填写工厂</div></div>
    <div class="form-group" id="facAmountGroup"><label>金额 <span class="req">*</span></label><input class="input" id="facAmount" placeholder="0.00" /><div class="form-error">请填写金额</div></div>
    <div class="form-row"><div class="form-group"><label>承诺日</label><input class="input" type="date" id="facPromise" /></div><div class="form-group"><label>预测日</label><input class="input" type="date" id="facForecast" /></div></div>
  `, ()=>{
    const name=document.getElementById('facName').value.trim();
    const amount=Number(document.getElementById('facAmount').value);
    let ok=true;clearField('facNameGroup');clearField('facAmountGroup');
    if(!name){fieldError('facNameGroup');ok=false;}
    if(!(amount>0)){fieldError('facAmountGroup');ok=false;}
    if(!ok) return false;
    const content=document.getElementById('facContent').value;
    p.factories=p.factories||[];
    p.factories.push({name, content, amount, promise:document.getElementById('facPromise').value, forecast:document.getElementById('facForecast').value, actual:'', status:'待开工', at:stepNow()});
    pushChange(p,'添加拆单包','未填', content+' · '+name+' '+money(amount));
    toast('已添加拆单包');render();
  });
}
function openPkgStatus(id, index){
  const p=findProject(id);if(!p||p.lost) return;
  const f=(p.factories||[])[index];if(!f) return;
  openModule('改状态 · '+f.content, `
    <p class="page-note">${esc(f.name)}。已完工和已到货算齐套。预测日过了还没齐，生产协同时会显示延期。</p>
    <div class="form-group"><label>状态</label><select class="input select" id="pkgStatus" style="width:100%">${['待开工','备货中','生产中','已完工','已到货'].map(s=>`<option ${f.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
    <div class="form-group"><label>预测日</label><input class="input" type="date" id="pkgForecast" value="${esc(f.forecast||'')}" /></div>
    <div class="form-group"><label>实际日</label><input class="input" type="date" id="pkgActual" value="${esc(f.actual||'')}" /></div>
  `, ()=>{
    const status=document.getElementById('pkgStatus').value;
    const forecast=document.getElementById('pkgForecast').value;
    let actual=document.getElementById('pkgActual').value;
    if((status==='已完工'||status==='已到货')&&!actual) actual=TODAY;
    const before=f.status||'待开工';
    f.status=status;f.forecast=forecast;f.actual=actual;
    pushChange(p,'改拆单包', before, f.content+' '+status);
    toast('已更新 '+f.content);render();
  });
}
function openRectify(id){
  const p=findProject(id);if(!p||p.lost) return;
  openModule('打开整改', `
    <p class="page-note">新增一条未关闭的整改，记在下面的整改表里。</p>
    <div class="form-group" id="rfTitleGroup"><label>事项 <span class="req">*</span></label><input class="input" id="rfTitle" /><div class="form-error">请填写事项</div></div>
    <div class="form-group"><label>说明</label><textarea class="input" id="rfNote"></textarea></div>
  `, ()=>{
    const title=document.getElementById('rfTitle').value.trim();
    clearField('rfTitleGroup');
    if(!title){fieldError('rfTitleGroup');return false;}
    p.rectifies=p.rectifies||[];
    p.rectifies.push({title, note:document.getElementById('rfNote').value.trim(), status:'未关闭', at:stepNow()});
    pushChange(p,'打开整改','未填', title);
    toast('已打开整改');render();
  });
}
function previewProjectFile(id, i){
  const p=findProject(id);if(!p||!p.files[i]) return;
  const f=p.files[i];
  const kind=drawingKind(f.type, f.name);
  document.getElementById('previewTitle').textContent=f.name||'预览';
  const body=document.getElementById('previewBody');
  if(kind==='image'&&f.url) body.innerHTML='<img class="preview-image" alt="" src="'+f.url+'">';
  else if(kind==='pdf'&&f.url) body.innerHTML='<iframe class="preview-frame" title="预览" src="'+f.url+'"></iframe>';
  else body.textContent='这个格式不能在页面里看，可以下载。';
  previewJob=function(){
    const a=document.createElement('a');
    let made='';
    if(f.url) a.href=f.url;
    else {made=URL.createObjectURL(new Blob(['原型示意文件'],{type:'text/plain'}));a.href=made;}
    a.download=f.name||'file';
    a.click();
    if(made) setTimeout(()=>URL.revokeObjectURL(made),1000);
  };
  openModal('previewModal');
}
function deleteProjectFile(id, i){
  const p=findProject(id);if(!p||!p.files[i]) return;
  const f=p.files[i];
  const st=p.steps.find(s=>s.seq===f.seq);
  if(p.lost||(st&&(st.status==='已完成'||st.status==='不适用'))){toast('这一步已经结束，文件不能删');return;}
  openModule('删除文件', `<p style="margin:0">删除「${esc(f.name)}」？</p>`, ()=>{
    if(f.url) URL.revokeObjectURL(f.url);
    p.files.splice(i,1);
    syncProject(p);
    toast('已删除');
    render();
  });
}
function openCreateProject(){
  const selectable=customers.filter(c=>c.serviceType!=='分发'&&c.boardStage!=='已分发'&&c.status!=='已流失');
  openModule('立项', `
    <p class="page-note">可以选择已有客户，也可以直接新增。新增要填城市和渠道。已分发的客户不能立项。合同金额在客户签字时按最终报价写入，同时生成应收。设计师在这里指定，设计动作只给这个人。定金在第一步上传定金合同时入账，签字前只记预收。</p>
    <div class="form-group"><label>客户</label><div class="segment" id="pMode">
      <button type="button" class="active" data-v="old" onclick="setProjectMode(this)">选择已有</button>
      <button type="button" data-v="new" onclick="setProjectMode(this)">直接新增</button>
    </div></div>
    <div id="pOld">
      <div class="form-group" id="pCustomerGroup"><label>已有客户 <span class="req">*</span></label>
        <select class="input select" id="pCustomer" style="width:100%" onchange="fillProjectCustomer(this.value)"><option value="">请选择</option>${selectable.map(c=>`<option value="${c.id}">${esc(c.name)} · ${c.id}</option>`).join('')}</select>
        <div class="form-error">请选择客户</div></div>
    </div>
    <div id="pNew" style="display:none">
      <div class="form-row">
        <div class="form-group" id="pNameGroup"><label>姓名</label><input class="input" id="pName" placeholder="客户姓名" /><div class="form-error">请填写姓名</div></div>
        <div class="form-group" id="pPhoneGroup"><label>电话</label><input class="input" id="pPhone" placeholder="11位手机号" /><div class="form-error">电话或微信至少填一个</div></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>微信</label><input class="input" id="pWx" placeholder="微信号" /></div>
        <div class="form-group" id="pCityGroup"><label>城市 <span class="req">*</span></label><input class="input" id="pCity" placeholder="所在城市" /><div class="form-error">请填写城市</div></div>
      </div>
      <div class="form-group"><label>渠道</label><select class="input select" id="pChannel" style="width:100%"><option value="">请选择渠道</option><option>抖音直播</option><option>抖音视频</option><option>小红书视频</option><option>视频号</option><option>豆包</option><option>老客户转介绍</option><option>设计师/前端合作</option><option>同行异业</option><option>自然到店/来电</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>电话</label><input class="input" id="pShowPhone" /></div>
      <div class="form-group" id="pAddressGroup"><label>地址 <span class="req">*</span></label><input class="input" id="pAddress" placeholder="小区或地址" /><div class="form-error">请填写地址</div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>定金金额</label><input class="input" id="pDeposit" placeholder="0.00" inputmode="decimal" /></div>
      <div class="form-group"><label>产品 <span class="hint">可以后补</span></label><input class="input" id="pProduct" placeholder="全屋 / 橱柜 / 衣柜" /></div>
    </div>
    <div class="form-group" id="pDesignerGroup"><label>设计师 <span class="req">*</span></label>
      <select class="input select" id="pDesigner" style="width:100%"><option value="">请选择设计师</option><option>设计老张</option><option>设计小王</option></select>
      <div class="form-error">请选择设计师</div></div>
  `, submitProject);
}
function setProjectMode(btn){
  document.querySelectorAll('#pMode button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const neu=btn.dataset.v==='new';
  document.getElementById('pOld').style.display=neu?'none':'block';
  document.getElementById('pNew').style.display=neu?'block':'none';
}
function fillProjectCustomer(id){
  const c=customers.find(x=>x.id===id);if(!c)return;
  document.getElementById('pShowPhone').value=c.phone||'';
  if(!document.getElementById('pAddress').value) document.getElementById('pAddress').value=c.city||'';
}
function submitProject(){
  const mode=document.querySelector('#pMode button.active').dataset.v;
  const designer=document.getElementById('pDesigner').value;
  const address=document.getElementById('pAddress').value.trim();
  let ok=true;
  ['pCustomerGroup','pNameGroup','pPhoneGroup','pCityGroup','pAddressGroup','pDesignerGroup'].forEach(clearField);
  if(!designer){fieldError('pDesignerGroup');ok=false;}
  if(!address){fieldError('pAddressGroup');ok=false;}
  let customer;
  if(mode==='old'){
    const cid=document.getElementById('pCustomer').value;
    if(!cid){fieldError('pCustomerGroup');ok=false;}
    customer=customers.find(x=>x.id===cid);
    if(customer&&(customer.serviceType==='分发'||customer.boardStage==='已分发')){toast('已分发的客户不能立项');return false;}
  } else {
    const name=document.getElementById('pName').value.trim();
    const phone=document.getElementById('pPhone').value.trim();
    const wx=document.getElementById('pWx').value.trim();
    const city=document.getElementById('pCity').value.trim();
    if(!name){fieldError('pNameGroup');ok=false;}
    if(!phone&&!wx){fieldError('pPhoneGroup');ok=false;}
    if(!city){fieldError('pCityGroup');ok=false;}
    if(ok){
      const channel=document.getElementById('pChannel').value||'—';
      const source=CHANNEL_SOURCE[channel]||'—';
      const nid='KH-2026-'+String(customers.length+1).padStart(3,'0');
      customer={id:nid,name,phone,wechat:wx||('wx_'+Date.now().toString().slice(-6)),city,source,channel,intent:'',status:'已成交',points:null,owner:'老板',serviceType:'自营',dealers:[],distributeReason:'',nextFollow:null,lastFollow:null,contactNote:'',hasDrawing:false,reception:5,follows:[],projects:[],boardStage:'已成交',quote:'已发',quoteSkipReason:'',returnVisit:null,lostReason:'',highBudget:false};
      customers.unshift(customer);
    }
  }
  if(!ok||!customer) return false;
  const deposit=Number(document.getElementById('pDeposit').value)||0;
  const n=CONTRACTS.length+1;
  const id='HT-202611-'+String(100+n).slice(-3);
  const project={id, customerId:customer.id, customerName:customer.name, phone:customer.phone, designer, address, stage:'设计中', amount:0, due:0, days:45, ended:false, lost:false,
    product:document.getElementById('pProduct').value.trim(), civil:'未进场', measureDate:'', needMeasure:'是', promise:'', quoteAmount:'', installDate:'', installDays:'', sitePhone:'',
    depositHint:deposit>0?deposit:'', files:[], factories:[], rectifies:[], changes:[], steps:seedSteps(0)};
  syncProject(project);
  pushChange(project,'立项','未填', id);
  CONTRACTS.unshift(project);
  if(customer.status!=='已成交'){customer.status='已成交';customer.boardStage='已成交';}
  toast('已立项 '+id);render();
}

function financeSubnav(active){
  const tabs=[['finance','收支'],['expenses','日常开支'],['commission','内部提成'],['margin','项目毛利']];
  return `<div class="submod">${tabs.map(([view,label])=>`<button type="button" class="${active===view?'active':''}" onclick="goView('${view}')">${label}</button>`).join('')}</div>`;
}
function renderFinance(){
  const s=financeSummary();
  const recs=CONTRACTS.map(p=>({p, rec:receivableOf(p)})).filter(x=>x.rec);
  const unsigned=CONTRACTS.filter(p=>!contractSigned(p));
  const arAmount=recs.reduce((sum,x)=>sum+x.rec.amount,0);
  pageShell(`
    <div class="page-head"><div><h1>财务中心</h1><p>客户签字之后才有应收。签字前收到的钱记成预收，签字当天冲进这笔应收。统计截止 ${TODAY}。</p></div>
      <button class="btn btn-primary" onclick="openLedger()">记账</button></div>
    ${financeSubnav('finance')}
    <div class="kpi-grid">
      <div class="kpi"><div class="n">${money(arAmount)}</div><div class="l">应收总额</div></div>
      <div class="kpi"><div class="n">${money(s.due)}</div><div class="l">未收</div></div>
      <div class="kpi"><div class="n">${money(s.income)}</div><div class="l">本月收入</div></div>
      <div class="kpi"><div class="n">${money(s.net)}</div><div class="l">本月净额</div></div>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="n">${money(s.pay)}</div><div class="l">本月付款</div></div>
      <div class="kpi"><div class="n">${money(EXPENSES.filter(x=>!x.unpaid&&x.date.startsWith(TODAY.slice(0,7))).reduce((a,x)=>a+x.amount,0))}</div><div class="l">本月开支</div></div>
      <div class="kpi"><div class="n">${money(s.received)}</div><div class="l">累计已收款</div></div>
      <div class="kpi"><div class="n">${recs.filter(x=>x.rec.status==='已收齐').length}</div><div class="l">已收齐</div></div>
    </div>
    <div class="block-title">应收款项</div>
    <p class="page-note">只列出已经完成「客户签字」的项目。应收金额等于合同金额，已收包含签字前的定金。未收大于 0 时，项目里的「收全款」还不能完成。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>项目</th><th>客户</th><th>签字日</th><th>应收</th><th>已收</th><th>未收</th><th>状态</th></tr></thead><tbody>
      ${recs.map(x=>`<tr onclick="goProject('${x.p.id}')"><td>${esc(x.p.id)}</td><td>${esc(x.p.customerName)}</td><td>${esc((x.rec.signedAt||'').slice(0,10)||'—')}</td><td>${money(x.rec.amount)}</td><td>${money(x.rec.got)}</td><td>${money(x.rec.open)}</td><td>${arStatusBadge(x.rec.status)}</td></tr>`).join('')||'<tr><td colspan="7">还没有签完合同的项目</td></tr>'}
    </tbody></table></div>
    ${unsigned.length?`<div class="callout" style="margin-top:12px">${unsigned.map(p=>{const got=projectReceived(p.id);return esc(p.customerName)+' '+esc(p.id)+' 还没签合同，不产生应收'+(got>0?'。已收 '+money(got)+' 先记预收':'');}).join('<br>')}</div>`:''}
    <div class="block-title">收支流水</div>
    <p class="page-note">项目列用项目号。收款在签字前记预收，签字后冲减上面的应收。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>种类</th><th>方向</th><th>金额</th><th>科目</th><th>计入成本</th><th>发生日</th><th>项目</th><th>尚未付出</th></tr></thead><tbody>
      ${LEDGER.map(x=>`<tr><td>${esc(x.kind)}</td><td>${esc(x.dir)}</td><td>${money(x.amount)}</td><td>${esc(x.subject||'—')}</td><td>${x.cost?'是':'—'}</td><td>${esc(x.date)}</td><td>${esc(x.project||'—')}</td><td>${x.unpaid?'是':'—'}</td></tr>`).join('')}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${LEDGER.length} 条</span></div>
  `);
}
function renderExpenses(){
  const month=TODAY.slice(0,7);
  const paid=EXPENSES.filter(x=>!x.unpaid&&x.date.startsWith(month)).reduce((s,x)=>s+x.amount,0);
  const open=EXPENSES.filter(x=>x.unpaid).reduce((s,x)=>s+x.amount,0);
  pageShell(`
    <div class="page-head"><div><h1>日常开支</h1><p>房租、工资、推广这些不挂在项目上的开支。统计截止 ${TODAY}。</p></div>
      <button class="btn btn-primary" onclick="openExpense()">记下日常开支</button></div>
    ${financeSubnav('expenses')}
    <div class="kpi-grid">
      <div class="kpi"><div class="n">${EXPENSES.length}</div><div class="l">笔数</div></div>
      <div class="kpi"><div class="n">${money(paid)}</div><div class="l">本月已付</div></div>
      <div class="kpi"><div class="n">${money(open)}</div><div class="l">尚未付出</div></div>
      <div class="kpi"><div class="n">${money(EXPENSES.reduce((s,x)=>s+x.amount,0))}</div><div class="l">累计</div></div>
    </div>
    ${EXPENSES.length?`<div class="table-wrap"><table class="data"><thead><tr><th>类别</th><th>发生日</th><th>到期日</th><th>金额</th><th>说明</th><th>尚未付出</th></tr></thead><tbody>${EXPENSES.map(e=>`<tr><td>${esc(e.category)}</td><td>${esc(e.date)}</td><td>${esc(e.due||'—')}</td><td>${money(e.amount)}</td><td>${esc(e.note||'—')}</td><td>${e.unpaid?'是':'—'}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">还没有日常开支</div>'}
  `);
}
function renderCommission(){
  const pending=COMMISSIONS.filter(c=>c.status!=='已发');
  pageShell(`
    <div class="page-head"><div><h1>内部提成</h1><p>设计、销售和项目提成记在这里，不进项目成本。统计截止 ${TODAY}。</p></div>
      <button class="btn btn-primary" onclick="openCommission()">记内部提成</button></div>
    ${financeSubnav('commission')}
    <div class="kpi-grid">
      <div class="kpi"><div class="n">${COMMISSIONS.length}</div><div class="l">笔数</div></div>
      <div class="kpi"><div class="n">${money(pending.reduce((s,c)=>s+c.amount,0))}</div><div class="l">待发</div></div>
      <div class="kpi"><div class="n">${pending.length}</div><div class="l">待发笔数</div></div>
      <div class="kpi"><div class="n">${money(COMMISSIONS.reduce((s,c)=>s+c.amount,0))}</div><div class="l">累计</div></div>
    </div>
    ${COMMISSIONS.length?`<div class="table-wrap"><table class="data"><thead><tr><th>种类</th><th>归属人</th><th>项目</th><th>基数</th><th>比例</th><th>金额</th><th>到期日</th><th>状态</th></tr></thead><tbody>${COMMISSIONS.map(c=>`<tr><td>${esc(c.kind)}</td><td>${esc(c.owner)}</td><td>${esc(c.project)}</td><td>${money(c.base)}</td><td>${c.rate}%</td><td>${money(c.amount)}</td><td>${esc(c.due||'—')}</td><td>${esc(c.status)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">还没有内部提成</div>'}
  `);
}
function renderMargin(){
  const high=ruleValue('毛利率偏高线',55);
  const low=ruleValue('毛利率偏低线',25);
  const margins=CONTRACTS.filter(p=>contractSigned(p)&&Number(p.amount)>0).map(p=>{
    const cost=projectCost(p.id);
    const rate=Number(p.amount)?(Number(p.amount)-cost)/Number(p.amount)*100:0;
    let note='';let cls='';
    if(rate<low){note='毛利率偏低';cls='margin-bad';}
    else if(rate>high){note='成本可能没录全';cls='margin-warn';}
    return {p, cost, rate, note, cls};
  });
  pageShell(`
    <div class="page-head"><div><h1>项目毛利</h1><p>只算已经签字的项目。毛利率 =（订单总额 − 成本）÷ 订单总额。统计截止 ${TODAY}。</p></div></div>
    ${financeSubnav('margin')}
    <p class="page-note">低于 ${low}% 标红，高于 ${high}% 写成本可能没录全。成本只计项目付款里勾了计入成本的金额。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>项目</th><th>客户</th><th>阶段</th><th>订单总额</th><th>成本</th><th>毛利</th><th>毛利率</th><th>说明</th></tr></thead><tbody>
      ${margins.map(m=>`<tr onclick="goProject('${m.p.id}')"><td>${esc(m.p.id)}</td><td>${esc(m.p.customerName)}</td><td>${esc(m.p.stage)}</td><td>${money(m.p.amount)}</td><td>${money(m.cost)}</td><td>${money(m.p.amount-m.cost)}</td><td class="${m.cls}">${m.rate.toFixed(2)}%</td><td>${esc(m.note||'—')}</td></tr>`).join('')||'<tr><td colspan="8">还没有可算毛利率的项目</td></tr>'}
    </tbody></table></div>
  `);
}
function openLedger(){
  openModule('记账', `
    <div class="form-group" id="lKindGroup"><label>种类</label><select class="input select" id="lKind" style="width:100%" onchange="document.getElementById('lPayFields').style.display=this.value==='项目付款'?'block':'none'"><option>项目收款</option><option>项目付款</option></select></div>
    <div class="form-group" id="lProjectGroup"><label>项目 <span class="req">*</span></label><select class="input select" id="lProject" style="width:100%"><option value="">请选择</option>${CONTRACTS.map(p=>`<option value="${p.id}">${p.id} · ${esc(p.customerName)}</option>`).join('')}</select><div class="form-error">请选择项目</div></div>
    <div class="form-group" id="lAmountGroup"><label>金额 <span class="req">*</span></label><input class="input" id="lAmount" placeholder="0.00" /><div class="form-error">请填写金额</div></div>
    <div class="form-group"><label>发生日</label><input class="input" type="date" id="lDate" value="${TODAY}" /></div>
    <div id="lPayFields" style="display:none">
      <div class="form-group"><label>科目</label><select class="input select" id="lSubject" style="width:100%"><option>安装费</option><option>材料</option><option>物流</option><option>其他</option></select></div>
      <label class="check-row"><input type="checkbox" id="lCost" checked /><span class="check"></span><span class="check-text"><span>计入成本</span></span></label>
    </div>
  `, ()=>{
    const project=document.getElementById('lProject').value;
    const amount=Number(document.getElementById('lAmount').value);
    let ok=true;clearField('lProjectGroup');clearField('lAmountGroup');
    if(!project){fieldError('lProjectGroup');ok=false;}
    if(!(amount>0)){fieldError('lAmountGroup');ok=false;}
    if(!ok) return false;
    const kind=document.getElementById('lKind').value;
    const dir=kind==='项目付款'?'付款':'收款';
    LEDGER.unshift({kind, dir, amount, subject:dir==='付款'?document.getElementById('lSubject').value:'', cost:dir==='付款'&&document.getElementById('lCost').checked, date:document.getElementById('lDate').value||TODAY, due:'', project, customer:'', unpaid:false});
    const p=CONTRACTS.find(x=>x.id===project);
    if(p&&dir==='收款') refreshDue(p);
    const rec=p&&receivableOf(p);
    if(dir==='收款'&&p&&!contractSigned(p)) toast('已记下预收。签完合同后冲进应收。');
    else if(dir==='收款'&&rec) toast(rec.open>0?'已冲减应收，还剩 '+money(rec.open):'已冲减应收');
    else toast('已记账');
    render();
  });
}
function openExpense(){
  openModule('日常开支', `
    <div class="form-group" id="eCatGroup"><label>类别 <span class="req">*</span></label><select class="input select" id="eCat" style="width:100%"><option value="">请选择</option><option>房租</option><option>工资</option><option>推广</option><option>其他</option></select><div class="form-error">请选择开支类别</div></div>
    <div class="form-row"><div class="form-group" id="eAmountGroup"><label>金额 <span class="req">*</span></label><input class="input" id="eAmount" /><div class="form-error">请填写金额</div></div><div class="form-group"><label>发生日</label><input class="input" type="date" id="eDate" value="${TODAY}" /></div></div>
    <div class="form-group"><label>到期日</label><input class="input" type="date" id="eDue" /></div>
    <div class="form-group"><label>说明</label><input class="input" id="eNote" /></div>
    <label class="check-row"><input type="checkbox" id="eUnpaid" /><span class="check"></span><span class="check-text"><span>尚未付出</span></span></label>
  `, ()=>{
    const category=document.getElementById('eCat').value;
    const amount=Number(document.getElementById('eAmount').value);
    let ok=true;clearField('eCatGroup');clearField('eAmountGroup');
    if(!category){fieldError('eCatGroup');ok=false;}
    if(!(amount>0)){fieldError('eAmountGroup');ok=false;}
    if(!ok) return false;
    EXPENSES.unshift({category, amount, date:document.getElementById('eDate').value||TODAY, due:document.getElementById('eDue').value, note:document.getElementById('eNote').value.trim(), unpaid:document.getElementById('eUnpaid').checked});
    toast('已记下日常开支');render();
  });
}
function openCommission(){
  openModule('记内部提成', `
    <div class="form-row">
      <div class="form-group"><label>种类</label><select class="input select" id="cKind" style="width:100%"><option>设计提成</option><option>销售提成</option><option>项目提成</option></select></div>
      <div class="form-group" id="cOwnerGroup"><label>归属人 <span class="req">*</span></label><input class="input" id="cOwner" placeholder="姓名" /><div class="form-error">请填写归属人</div></div>
    </div>
    <div class="form-group"><label>项目</label><select class="input select" id="cProject" style="width:100%"><option value="">不关联项目</option>${CONTRACTS.map(p=>`<option value="${p.id}">${p.id} · ${esc(p.customerName)}</option>`).join('')}</select></div>
    <div class="form-row">
      <div class="form-group" id="cBaseGroup"><label>基数 <span class="req">*</span></label><input class="input" id="cBase" /><div class="form-error">请填写基数</div></div>
      <div class="form-group"><label>比例 %</label><input class="input" id="cRate" value="5" /></div>
    </div>
    <div class="form-group"><label>到期日</label><input class="input" type="date" id="cDue" /></div>
  `, ()=>{
    const owner=document.getElementById('cOwner').value.trim();
    const base=Number(document.getElementById('cBase').value);
    let ok=true;clearField('cOwnerGroup');clearField('cBaseGroup');
    if(!owner){fieldError('cOwnerGroup');ok=false;}
    if(!(base>0)){fieldError('cBaseGroup');ok=false;}
    if(!ok) return false;
    const rate=Number(document.getElementById('cRate').value)||0;
    COMMISSIONS.unshift({kind:document.getElementById('cKind').value, owner, project:document.getElementById('cProject').value||'—', base, rate, amount:Math.round(base*rate)/100, due:document.getElementById('cDue').value, status:'待发'});
    toast('已记内部提成');render();
  });
}

function shareRows(title, rows){
  const total=rows.reduce((s,r)=>s+r.n,0)||1;
  const bars=rows.map(r=>`<div class="bar-row"><div class="bar-lab" title="${esc(r.name)}">${esc(r.name)}</div><div class="bar-track"><i style="width:${(r.n/total*100).toFixed(1)}%"></i></div><div class="bar-val">${r.n}</div></div>`).join('');
  return `<div class="panel"><div class="panel-hd"><h3>${esc(title)}</h3><span class="meta">共 ${rows.reduce((s,r)=>s+r.n,0)}</span></div><div style="padding:4px 16px 12px">${bars||'<div class="empty-inline">暂无</div>'}</div></div>`;
}

function renderRules(){
  pageShell(`
    <div class="page-head"><div><h1>规则设置</h1><p>当前岗位 负责人。财务只能看。修改必须填原因。停用后这条规则不再参与计算，已写下的积分和抽成不会改写。</p></div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>规则</th><th>当前值</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${RULES.map((r,i)=>`<tr class="${r.enabled?'':'rule-off'}"><td>${esc(r.name)}</td><td>${esc(r.value)}${r.enabled?'':' · 已停用'}</td><td><div class="ops"><button class="btn btn-sm btn-default" onclick="editRule(${i})">编辑</button><button class="btn btn-sm btn-default" onclick="toggleRule(${i})">${r.enabled?'停用':'启用'}</button></div></td></tr>`).join('')}
    </tbody></table></div>
    <div class="block-title">账号 <button class="btn btn-primary btn-sm" onclick="editAccount(-1)">新增账号</button></div>
    <p class="page-note">点编辑可以改姓名、密码和能进入的板块。密码留空表示不改。推荐板块按岗位给出，可以再改。没勾的菜单不出现。负责人始终是全部板块。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>账号</th><th>姓名</th><th>岗位</th><th>状态</th><th>板块</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${ACCOUNTS.map((a,i)=>`<tr><td>${esc(a.account)}</td><td>${esc(a.name)}</td><td>${esc(a.role)}</td><td>${esc(a.status)}</td><td>${esc(a.modules)}</td><td><div class="ops"><button class="btn btn-sm btn-default" onclick="editAccount(${i})">编辑</button>${a.locked?'':`<button class="btn btn-sm btn-default" onclick="deleteAccount(${i})">删除</button>`}</div></td></tr>`).join('')}
    </tbody></table></div>
  `);
}
function editRule(i){
  const r=RULES[i];
  openModule('修改'+r.name, `
    <div class="form-group" id="rValueGroup"><label>新值 <span class="req">*</span></label><input class="input" id="rValue" value="${esc(r.value)}" /><div class="form-error">请填写新值</div></div>
    <div class="form-group"><label>生效</label><input class="input" value="立即" disabled /></div>
    <div class="form-group" id="rReasonGroup"><label>原因 <span class="req">*</span></label><textarea class="input" id="rReason" placeholder="请填写原因"></textarea><div class="form-error">请填写原因</div></div>
  `, ()=>{
    const value=document.getElementById('rValue').value.trim();
    const reason=document.getElementById('rReason').value.trim();
    let ok=true;clearField('rValueGroup');clearField('rReasonGroup');
    if(!value){fieldError('rValueGroup');ok=false;}
    if(!reason){fieldError('rReasonGroup');ok=false;}
    if(!ok) return false;
    r.value=value;
    if(r.name==='A类分级积分') GRADE_POINTS.A=Number(value);
    if(r.name==='B类分级积分') GRADE_POINTS.B=Number(value);
    if(r.name==='C类分级积分') GRADE_POINTS.C=Number(value);
    toast('已修改，原因：'+reason);render();
  });
}
function toggleRule(i){RULES[i].enabled=!RULES[i].enabled;toast(RULES[i].enabled?'已启用':'已停用');render();}
function editAccount(i){
  const a=i>=0?ACCOUNTS[i]:{account:'',name:'',role:'销售',status:'已开通',modules:ROLE_MODULES['销售'].join('、'),locked:false};
  const selected=new Set(a.modules.split('、'));
  openModule(i>=0?'编辑账号':'新增账号', `
    <div class="form-row">
      <div class="form-group" id="aAccountGroup"><label>账号 <span class="req">*</span></label><input class="input" id="aAccount" value="${esc(a.account)}" ${a.locked?'disabled':''} /><div class="form-error">请填写账号</div></div>
      <div class="form-group" id="aNameGroup"><label>姓名 <span class="req">*</span></label><input class="input" id="aName" value="${esc(a.name)}" /><div class="form-error">请填写姓名</div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>岗位</label><select class="input select" id="aRole" style="width:100%" onchange="fillRoleModules(this.value)" ${a.locked?'disabled':''}>${Object.keys(ROLE_MODULES).map(r=>`<option ${r===a.role?'selected':''}>${r}</option>`).join('')}</select></div>
      <div class="form-group"><label>状态</label><select class="input select" id="aStatus" style="width:100%"><option ${a.status==='已开通'?'selected':''}>已开通</option><option ${a.status==='未开通'?'selected':''}>未开通</option></select></div>
    </div>
    <div class="form-group"><label>密码 <span class="hint">留空表示不改</span></label><input class="input" id="aPass" type="password" placeholder="留空表示不改" /></div>
    <div class="form-group"><label>板块</label><div id="aModules" style="display:flex;flex-wrap:wrap;gap:8px">${MODULE_OPTIONS.map(m=>`<label class="check-row" style="width:180px"><input type="checkbox" value="${m}" ${selected.has(m)?'checked':''} ${a.locked?'disabled':''} /><span class="check"></span><span class="check-text"><span>${m}</span></span></label>`).join('')}</div></div>
  `, ()=>{
    const account=document.getElementById('aAccount').value.trim();
    const name=document.getElementById('aName').value.trim();
    let ok=true;clearField('aAccountGroup');clearField('aNameGroup');
    if(!account){fieldError('aAccountGroup');ok=false;}
    if(!name){fieldError('aNameGroup');ok=false;}
    if(!ok) return false;
    const modules=[...document.querySelectorAll('#aModules input:checked')].map(x=>x.value).join('、');
    const row={account, name, role:document.getElementById('aRole').value, status:document.getElementById('aStatus').value, modules:modules||'—', locked:!!a.locked};
    if(i>=0) ACCOUNTS[i]=row; else ACCOUNTS.push(row);
    toast(i>=0?'已保存账号':'已新增账号');render();
  });
}
function fillRoleModules(role){
  const set=new Set(ROLE_MODULES[role]||[]);
  document.querySelectorAll('#aModules input').forEach(el=>{el.checked=set.has(el.value);});
}
function deleteAccount(i){const a=ACCOUNTS[i];if(a.locked)return;ACCOUNTS.splice(i,1);toast('已删除 '+a.name);render();}

function dealerUsers(name){return customers.filter(c=>(c.dealers||[]).includes(name));}
function renderDealers(){
  const q=(state.dealerQ||'').trim();
  const list=DEALERS.filter(d=>!q||[d.name,d.city,d.contact,d.phone].some(v=>String(v||'').includes(q)));
  const rows=list.map(d=>{
    const used=dealerUsers(d.name);
    return `<tr class="${d.active?'':'rule-off'}"><td><strong>${esc(d.name)}</strong><div style="font-size:12px;color:var(--text-muted)">${esc(d.id)}</div></td><td>${esc(d.city)}</td><td>${esc(d.contact||'—')}</td><td>${d.phone?fmtPhone(d.phone):'—'}</td><td title="${esc(used.map(c=>c.name).join('、'))}">${used.length}</td><td>${d.active?'<span class="badge badge-stage-done">合作中</span>':'<span class="badge badge-intent-none">已停用</span>'}</td><td class="col-ops"><div class="ops"><button class="btn btn-sm btn-default" onclick="openDealer('${d.id}')">编辑</button><button class="btn btn-sm btn-default" onclick="toggleDealerActive('${d.id}')">${d.active?'停用':'启用'}</button><button class="btn btn-sm btn-danger" onclick="deleteDealer('${d.id}')">删除</button></div></td></tr>`;
  }).join('');
  pageShell(`
    <div class="page-head"><div><h1>合作伙伴</h1><p>分发客户时从这里选。停用后分发列表不再出现，已经分出去的客户仍保留这家名字。</p></div>
      <button class="btn btn-primary" onclick="openDealer()">添加合作伙伴</button></div>
    <div class="toolbar"><div class="toolbar-right" style="margin-left:0"><div class="search-box ${q?'has-value':''}"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input placeholder="名称、城市、联系人或电话" value="${esc(q)}" oninput="state.dealerQ=this.value;render()" /><button class="clear" onclick="state.dealerQ='';render()" aria-label="清除">${iconClose()}</button></div></div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>名称</th><th>城市</th><th>联系人</th><th>电话</th><th>已分发</th><th>状态</th><th class="col-ops">操作</th></tr></thead><tbody>${rows||`<tr><td colspan="7">${q?'没有匹配的合作伙伴':'还没有合作伙伴，点「添加合作伙伴」建第一家。'}</td></tr>`}</tbody></table></div>
    <p class="page-note" style="margin-top:12px">共 ${list.length} 家</p>
  `);
}
function openDealer(id){
  const d=id?DEALERS.find(x=>x.id===id):null;
  if(id&&!d) return;
  const cur=d||{name:'',city:'',contact:'',phone:''};
  openModule(id?'编辑合作伙伴':'添加合作伙伴', `
    <div class="form-group" id="dNameGroup"><label>名称 <span class="req">*</span></label><input class="input" id="dName" value="${esc(cur.name)}" /><div class="form-error">请填写名称</div></div>
    <div class="form-group" id="dCityGroup"><label>城市 <span class="req">*</span></label><input class="input" id="dCity" value="${esc(cur.city)}" /><div class="form-error">请填写城市</div></div>
    <div class="form-group"><label>联系人</label><input class="input" id="dContact" value="${esc(cur.contact||'')}" /></div>
    <div class="form-group" id="dPhoneGroup"><label>电话</label><input class="input" id="dPhone" value="${esc(cur.phone||'')}" placeholder="可空" /><div class="form-error">请输入11位手机号</div></div>
  `, ()=>{
    const name=document.getElementById('dName').value.trim();
    const city=document.getElementById('dCity').value.trim();
    const contact=document.getElementById('dContact').value.trim();
    const phone=document.getElementById('dPhone').value.trim();
    let ok=true;
    clearField('dNameGroup');clearField('dCityGroup');clearField('dPhoneGroup');
    const nameErr=document.querySelector('#dNameGroup .form-error');
    nameErr.textContent='请填写名称';
    if(!name){fieldError('dNameGroup');ok=false;}
    else if(DEALERS.some(x=>x.name===name && x.id!==id)){nameErr.textContent='已有同名合作伙伴';fieldError('dNameGroup');ok=false;}
    if(!city){fieldError('dCityGroup');ok=false;}
    if(phone && !/^1\d{10}$/.test(phone)){fieldError('dPhoneGroup');ok=false;}
    if(!ok) return false;
    if(d){
      if(d.name!==name) customers.forEach(c=>{if(c.dealers) c.dealers=c.dealers.map(n=>n===d.name?name:n);});
      d.name=name;d.city=city;d.contact=contact;d.phone=phone;
      toast('已保存 '+name);
    }else{
      const n=DEALERS.reduce((m,x)=>Math.max(m, Number(String(x.id).replace(/\D/g,''))||0),0)+1;
      DEALERS.push({id:'JX-'+String(n).padStart(3,'0'),name,city,contact,phone,active:true});
      toast('已添加 '+name);
    }
    render();
  });
}
function toggleDealerActive(id){
  const d=DEALERS.find(x=>x.id===id);if(!d)return;
  d.active=!d.active;
  toast(d.active?'已启用 '+d.name:'已停用 '+d.name);
  render();
}
function deleteDealer(id){
  const d=DEALERS.find(x=>x.id===id);if(!d)return;
  const used=dealerUsers(d.name);
  const who=used.map(c=>c.name).join('、');
  openModule('删除合作伙伴', `<p style="margin:0 0 8px">确定删除「${esc(d.name)}」？</p><p class="page-note" style="margin:0">${used.length?`已经分给 ${esc(who)}。删除后这些客户上的名字还在，只是不能再新选这家。`:'还没有客户分给这家。删除后不能恢复。'}</p>`, ()=>{
    const i=DEALERS.findIndex(x=>x.id===id);
    if(i>=0) DEALERS.splice(i,1);
    toast('已删除 '+d.name);
    render();
  });
}

function hydrateProjects(){
  const lin=CONTRACTS.find(x=>x.id==='HT-202611-002');
  lin.steps=seedSteps(5,{
    1:{at:'2026-11-05 09:27', by:'老板'},
    2:{at:'2026-11-05 09:27', by:'系统', note:'系统已生成项目'},
    3:{at:'2026-11-05 09:27', by:'设计老张'},
    4:{at:'2026-11-05 09:28', by:'助理小邓'},
    5:{at:'2026-11-05 09:28', by:'设计老张'},
    7:{plan:'2026-11-12'},
    9:{plan:'2026-11-10'},
    11:{plan:'2026-11-10'}
  });
  const wu=CONTRACTS.find(x=>x.id==='HT-202611-001');
  wu.steps=seedSteps(27,{
    8:{status:'不适用', reason:'不需要', by:'设计小王', at:'2026-10-16 10:00'},
    10:{status:'不适用', reason:'不需要', by:'设计小王', at:'2026-10-18 10:00'},
    27:{status:'不适用', reason:'不需要', by:'销售小李', at:'2026-11-01 10:00'}
  });
  CONTRACTS.forEach(syncProject);
}
hydrateProjects();
