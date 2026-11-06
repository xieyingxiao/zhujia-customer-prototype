let CONTRACTS = [
  {id:'HT-202611-002', customerId:'KH-2026-002', customerName:'林晓', phone:'13800001002', designer:'设计老张', address:'重庆渝北', stage:'设计中', amount:0, due:-1000, days:45, ended:false, lost:false,
    progress:'节点判断 5/5 · 平面 0/2 · 深化 0/4 · 复测下单 0/9 · 生产安装 0/5 · 验收 0/2',
    action:{name:'输出平面图', group:'平面', status:'未开始', needFile:true, uploaded:false, blocker:'还要上传平面图。齐了才能点完成。'}},
  {id:'HT-202611-001', customerId:'KH-2026-005', customerName:'吴婷', phone:'13800001005', designer:'设计小王', address:'重庆', stage:'售后', amount:100000, due:0, days:45, ended:false, lost:false,
    progress:'节点判断 5/5 · 平面 2/2 · 深化 2/2（输出立面：不需要；输出深化图：不需要） · 复测下单 9/9 · 生产安装 5/5 · 验收 1/1（售后回访：不需要）',
    action:null, cost:20000}
];
let LEDGER = [
  {kind:'项目收款', dir:'收款', amount:1000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:5000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:94000, subject:'', cost:false, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目付款', dir:'付款', amount:20000, subject:'安装费', cost:true, date:'2026-11-04', due:'', project:'HT-202611-001', customer:'', unpaid:false},
  {kind:'项目收款', dir:'收款', amount:1000, subject:'', cost:false, date:'2026-11-05', due:'', project:'HT-202611-002', customer:'', unpaid:false}
];
let GOODS = [];
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
  {account:'admin', name:'老板', role:'负责人', status:'已开通', modules:'今日待办、销售管理、项目管理、收支记账、经营看板、规则设置', locked:true},
  {account:'design', name:'设计小王', role:'设计师', status:'已开通', modules:'今日待办、项目管理'},
  {account:'yanxuan-accept-assist', name:'助理小邓', role:'助理', status:'已开通', modules:'今日待办、销售管理、项目管理'},
  {account:'yanxuan-accept-design', name:'设计老张', role:'设计师', status:'已开通', modules:'今日待办、销售管理、项目管理、经营看板'},
  {account:'yanxuan-accept-finance', name:'财务小刘', role:'财务', status:'已开通', modules:'今日待办、销售管理、项目管理、收支记账、经营看板、规则设置'},
  {account:'yanxuan-accept-install', name:'安装师傅老赵', role:'安装队', status:'已开通', modules:'今日待办、项目管理'},
  {account:'yanxuan-accept-off', name:'停用账号', role:'销售', status:'未开通', modules:'今日待办、销售管理、项目管理、收支记账、经营看板、规则设置'},
  {account:'yanxuan-accept-pm', name:'项目经理小张', role:'项目经理', status:'已开通', modules:'今日待办、销售管理、项目管理、收支记账、经营看板'},
  {account:'yanxuan-accept-sales', name:'销售小李', role:'销售', status:'已开通', modules:'今日待办、销售管理、项目管理、收支记账、经营看板'}
];
const MODULE_OPTIONS = ['今日待办','销售管理','项目管理','收支记账','经营看板','合作伙伴','规则设置'];
const ROLE_MODULES = {负责人:MODULE_OPTIONS, 设计师:['今日待办','项目管理'], 助理:['今日待办','销售管理','项目管理'], 财务:['今日待办','销售管理','项目管理','收支记账','经营看板','规则设置'], 安装队:['今日待办','项目管理'], 销售:['今日待办','销售管理','项目管理','收支记账','经营看板','合作伙伴'], 项目经理:['今日待办','销售管理','项目管理','收支记账','经营看板']};

function money(n){return Number(n||0).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});}
function ruleValue(name, fallback){const r=RULES.find(x=>x.name===name);if(!r||!r.enabled)return fallback;const n=Number(r.value);return Number.isFinite(n)?n:fallback;}
function pageShell(html){
  document.getElementById('mobileSticky').classList.remove('show');
  document.querySelector('.content').classList.remove('detail-page');
  document.getElementById('content').innerHTML=`<div class="panel"><div class="panel-body">${html}</div></div>`;
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
    if(p.action && p.action.status!=='已完成') items.push({group:'project', kind:'项目事项', title:`${p.id} ${p.customerName}`, sub:p.action.name, detail:p.action.blocker||'当前这一步还没完成。', owner:p.designer||'—', view:'project', id:p.id});
  });
  LEDGER.filter(x=>x.unpaid&&x.project).forEach(x=>items.push({group:'project', kind:'待付', title:x.project, sub:`${x.kind} · ${money(x.amount)}`, detail:'这一单还有款没付出。', owner:'财务', view:'finance', id:''}));
  return items;
}
function workRows(){
  const rows=[];
  customers.forEach(c=>{
    if(c.status==='已流失'||c.boardStage==='流失') return;
    if(CONTRACTS.some(p=>p.customerId===c.id)) return;
    rows.push({type:'客户', title:`${c.id} ${c.name}`, stage:c.boardStage, desc:c.city, view:'detail', id:c.id});
  });
  CONTRACTS.filter(p=>!p.ended && !p.lost).forEach(p=>{
    rows.push({type:'项目', title:`${p.id} ${p.customerId} ${p.customerName}`, stage:p.stage, desc:p.address, view:'project', id:p.id});
  });
  return rows;
}
function openWork(view, id){if(view==='detail')goDetail(id);else if(view==='project')goProject(id);else goView('finance');}

function renderDashboard(){
  const rows=workRows();
  const today=todayItems().slice(0,8);
  const s=financeSummary();
  pageShell(`
    <p class="page-note">在办一行一个阶段。没有项目的客户占一行，每个项目占一行。</p>
    <div class="toolbar"><div class="toolbar-left"><button class="btn btn-default" onclick="render()">刷新</button></div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>类型</th><th>客户或合同</th><th>阶段</th><th>说明</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${rows.map(r=>`<tr><td>${esc(r.type)}</td><td><strong>${esc(r.title)}</strong></td><td>${stageBadge(r.stage)}</td><td>${esc(r.desc)}</td><td><button class="btn btn-sm btn-default" onclick="openWork('${r.view}','${r.id}')">打开</button></td></tr>`).join('')||'<tr><td colspan="5">还没有在办的客户或项目</td></tr>'}
    </tbody></table></div>
    <div class="block-title">今日 <button class="btn btn-text btn-sm" onclick="goView('today')">全部今日</button></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>事项</th><th>客户或项目</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${today.map(t=>`<tr><td>${esc(t.kind)}</td><td>${esc(t.title)} <span style="color:var(--text-muted)">${esc(t.sub)}</span></td><td><button class="btn btn-sm btn-primary" onclick="openWork('${t.view}','${t.id}')">去处理</button></td></tr>`).join('')||'<tr><td colspan="3">今天没有要处理的事</td></tr>'}
    </tbody></table></div>
    <div class="block-title">经营数字 <button class="btn btn-text btn-sm" onclick="goView('board')">打开看板</button></div>
    <p class="page-note">统计截止 ${TODAY}</p>
    ${kpiHtml(s)}
  `);
}
function kpiHtml(s){
  const cards=[['在途项目数',s.inFlight,''],['全款未收齐',s.unpaidCount,''],['累计已收款',money(s.received),s.receivedCount+' 条'],['待收金额',money(s.due),s.dueCount+' 条'],['本月收入',money(s.income),s.incomeCount+' 条'],['本月支出',money(s.pay),s.payCount+' 条'],['本月净额',money(s.net),s.entryCount+' 条'],['待发提成',money(s.commission),s.commissionCount+' 条']];
  return `<div class="kpi-grid">${cards.map(c=>`<div class="kpi"><div class="n">${c[1]}</div><div class="l">${c[0]}</div>${c[2]?`<div class="s">${c[2]}</div>`:''}</div>`).join('')}</div>`;
}
function financeSummary(){
  const month=TODAY.slice(0,7);
  const incomeRows=LEDGER.filter(x=>x.dir==='收款'&&x.date.startsWith(month));
  const payRows=LEDGER.filter(x=>x.dir==='付款'&&x.date.startsWith(month));
  const expensePaid=EXPENSES.filter(x=>!x.unpaid&&x.date.startsWith(month));
  const income=incomeRows.reduce((s,x)=>s+x.amount,0);
  const pay=payRows.reduce((s,x)=>s+x.amount,0)+expensePaid.reduce((s,x)=>s+x.amount,0);
  const dueRows=CONTRACTS.filter(p=>p.due>0);
  const unpaidProjects=CONTRACTS.filter(p=>p.amount>0&&p.due>0);
  const pendingCommission=COMMISSIONS.filter(c=>c.status!=='已发');
  return {
    inFlight:CONTRACTS.filter(p=>!p.ended&&!p.lost&&p.stage!=='售后').length,
    unpaidCount:unpaidProjects.length,
    received:LEDGER.filter(x=>x.dir==='收款').reduce((s,x)=>s+x.amount,0),
    receivedCount:LEDGER.filter(x=>x.dir==='收款').length,
    due:dueRows.reduce((s,p)=>s+p.due,0),
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
function renderToday(){
  const all=todayItems();
  const people=all.filter(t=>t.group==='customer');
  const jobs=all.filter(t=>t.group==='project');
  pageShell(`
    <div class="block-title" style="margin-top:0">今日待办 ${all.length} 条 <button class="btn btn-default btn-sm" onclick="render()">刷新</button></div>
    <p class="page-note">左边是还没签约的客户，右边是已经立项的项目。点「去处理」进入这个客户或这个项目。没有挂在项目上的日常开支，到收支记账里看。</p>
    <div class="today-split">
      <section class="today-pane"><div class="block-title">未签约客户 ${people.length} 条</div>${todayTable(people,'客户')}</section>
      <section class="today-pane"><div class="block-title">已签约项目 ${jobs.length} 条</div>${todayTable(jobs,'项目')}</section>
    </div>
  `);
}

function projectSubnav(active){
  const tabs=[['project','合同'],['actions','待办动作']];
  return `<div class="submod">${tabs.map(([view,label])=>`<button type="button" class="${active===view?'active':''}" onclick="goView('${view}')">${label}</button>`).join('')}</div>`;
}
function renderActions(){
  const filters=['全部','收款','报价签字','验收'];
  let list=CONTRACTS.filter(p=>p.action);
  if(state.actionFilter!=='全部') list=list.filter(p=>p.action.name.includes(state.actionFilter)||p.action.group===state.actionFilter);
  pageShell(`
    ${projectSubnav('actions')}
    <div class="block-title" style="margin-top:0">待办动作 <button class="btn btn-default btn-sm" onclick="render()">刷新</button></div>
    <p class="page-note">每个项目只显示当前这一步。完成或标不适用之后，下一步才会出现。还要上传文件时，完成按钮不可用。立项时指定设计师，设计动作只给这个人。</p>
    <div class="mini-tabs">${filters.map(k=>`<button class="filter-tab ${state.actionFilter===k?'active':''}" onclick="state.actionFilter='${k}';render()">${k}</button>`).join('')}</div>
    <div class="table-wrap"><table class="data"><thead><tr><th>合同</th><th>动作</th><th>设计师</th><th>状态</th><th>卡点</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${list.map(p=>`<tr><td>${esc(p.id)}</td><td>${esc(p.action.name)}</td><td>${esc(p.designer)}</td><td>${esc(p.action.status)}</td><td>${esc(p.action.blocker||'—')}</td><td><div class="ops">
        <button class="btn btn-sm btn-default" onclick="goProject('${p.id}')">打开项目</button>
        ${p.action.needFile?`<button class="btn btn-sm btn-default" onclick="uploadActionFile('${p.id}')">上传</button>`:''}
        <button class="btn btn-sm btn-primary" ${p.action.needFile&&!p.action.uploaded?'disabled':''} onclick="completeAction('${p.id}')">完成</button>
      </div></td></tr>`).join('')||'<tr><td colspan="6">这个筛选下没有待办动作</td></tr>'}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${list.length} 条</span></div>
  `);
}
function uploadActionFile(id){
  const p=CONTRACTS.find(x=>x.id===id);if(!p||!p.action)return;
  p.action.uploaded=true;p.action.blocker='文件已齐，可以点完成。';toast('已上传');render();
}
function completeAction(id){
  const p=CONTRACTS.find(x=>x.id===id);if(!p||!p.action)return;
  if(p.action.needFile&&!p.action.uploaded){toast(p.action.blocker);return;}
  const next={输出平面图:'输出立面图',输出立面图:'报价签字',报价签字:'收款',收款:'验收',验收:''};
  const name=next[p.action.name];
  if(!name){p.action=null;p.stage=p.stage==='设计中'?'生产安装':p.stage;toast('这一步已完成');render();return;}
  const need=name.startsWith('输出');
  p.action={name, group:name, status:'未开始', needFile:need, uploaded:false, blocker:need?'还要上传'+name.replace('输出','')+'。齐了才能点完成。':''};
  toast('已完成，进入下一步');render();
}

function renderProjects(){
  const list=CONTRACTS.filter(p=>state.showEnded||(!p.ended&&!p.lost));
  pageShell(`
    ${projectSubnav('project')}
    <div class="toolbar"><div class="toolbar-left">
      <button class="btn btn-primary" onclick="openCreateProject()">立项</button>
      <label class="check-row"><input type="checkbox" ${state.showEnded?'checked':''} onchange="state.showEnded=this.checked;render()" /><span class="check"></span><span class="check-text"><span>看已结束和流失</span></span></label>
    </div></div>
    <div class="table-wrap"><table class="data"><thead><tr><th>合同</th><th>客户</th><th>设计师</th><th>客户编号</th><th>电话</th><th>地址</th><th>阶段</th><th>分组进度</th><th>订单总额</th><th>待收</th><th>工期</th><th class="col-ops">操作</th></tr></thead><tbody>
      ${list.map(p=>`<tr onclick="goProject('${p.id}')"><td>${esc(p.id)}</td><td>${esc(p.customerName)}</td><td>${esc(p.designer)}</td><td>${esc(p.customerId)}</td><td class="phone">${fmtPhone(p.phone)}</td><td>${esc(p.address)}</td><td>${stageBadge(p.stage)}</td><td title="${esc(p.progress)}"><span class="ellipsis" style="max-width:220px">${esc(p.progress)}</span></td><td>${money(p.amount)}</td><td>${money(p.due)}</td><td>${p.days} 个工作日</td><td onclick="event.stopPropagation()"><button class="btn btn-sm btn-default" onclick="goProject('${p.id}')">打开</button></td></tr>`).join('')||'<tr><td colspan="12">没有合同</td></tr>'}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${list.length} 条</span></div>
  `);
}
function renderProjectDetail(){
  const p=CONTRACTS.find(x=>x.id===state.projectId);
  if(!p){goView('project');return;}
  const cost=projectCost(p.id);
  pageShell(`
    <div class="detail-header">
      <div><div class="detail-title"><h1>${esc(p.id)}</h1><div class="detail-tags">${stageBadge(p.stage)}</div></div>
        <div class="detail-id">${esc(p.customerName)} · ${esc(p.customerId)}</div></div>
      <div class="detail-actions">
        <button class="btn btn-default" onclick="goView('project')">返回项目</button>
        <button class="btn btn-primary" onclick="goDetail('${p.customerId}')">打开客户</button>
      </div>
    </div>
    <div class="info-grid info-grid-5">
      <div class="info-item"><label>设计师</label><div class="val">${esc(p.designer||'—')}</div></div>
      <div class="info-item"><label>电话</label><div class="val">${fmtPhone(p.phone)}</div></div>
      <div class="info-item"><label>地址</label><div class="val">${esc(p.address)}</div></div>
      <div class="info-item"><label>订单总额</label><div class="val">${money(p.amount)}</div></div>
      <div class="info-item"><label>待收</label><div class="val">${money(p.due)}</div></div>
      <div class="info-item"><label>工期</label><div class="val">${p.days} 个工作日</div></div>
      <div class="info-item"><label>成本</label><div class="val">${money(cost)}</div></div>
    </div>
    <div class="section"><div class="section-title">分组进度</div><div class="empty-inline" style="text-align:left">${esc(p.progress)}</div></div>
    <div class="section"><div class="section-title">当前动作</div>
      ${p.action?`<div class="drawing-box"><div><strong>${esc(p.action.name)}</strong><p>${esc(p.action.blocker||'可以处理这一步')}</p></div><div class="ops">
        ${p.action.needFile?`<button class="btn btn-default" onclick="uploadActionFile('${p.id}')">上传</button>`:''}
        <button class="btn btn-primary" ${p.action.needFile&&!p.action.uploaded?'disabled':''} onclick="completeAction('${p.id}')">完成</button>
      </div></div>`:'<div class="empty-inline">当前没有待办动作</div>'}
    </div>
  `);
}
function projectCost(id){return LEDGER.filter(x=>x.project===id&&x.dir==='付款'&&x.cost).reduce((s,x)=>s+x.amount,0);}
function openCreateProject(){
  const selectable=customers.filter(c=>c.serviceType!=='分发'&&c.boardStage!=='已分发'&&c.status!=='已流失');
  openModule('立项', `
    <p class="page-note">可以选择已有客户，也可以直接新增。新增要填城市和渠道。已分发的客户不能立项。合同金额在客户签字时按最终报价写入。设计师在这里指定，设计动作只给这个人。</p>
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
    const id=document.getElementById('pCustomer').value;
    if(!id){fieldError('pCustomerGroup');ok=false;}
    customer=customers.find(x=>x.id===id);
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
  CONTRACTS.unshift({id, customerId:customer.id, customerName:customer.name, phone:customer.phone, designer, address, stage:'设计中', amount:0, due:deposit?-deposit:0, days:45, ended:false, lost:false, progress:'节点判断 0/5 · 平面 0/2 · 深化 0/4 · 复测下单 0/9 · 生产安装 0/5 · 验收 0/2', action:{name:'输出平面图', group:'平面', status:'未开始', needFile:true, uploaded:false, blocker:'还要上传平面图。齐了才能点完成。'}, product:document.getElementById('pProduct').value.trim()});
  if(customer.status!=='已成交'){customer.status='已成交';customer.boardStage='已成交';}
  toast('已立项 '+id);render();
}

function renderFinance(){
  const s=financeSummary();
  pageShell(`
    <div class="toolbar"><div class="toolbar-left"><button class="btn btn-primary" onclick="openLedger()">记账</button></div></div>
    <div class="kpi-grid">
      <div class="kpi"><div class="n">${money(s.income)}</div><div class="l">本月收入</div></div>
      <div class="kpi"><div class="n">${money(s.pay)}</div><div class="l">本月付款</div></div>
      <div class="kpi"><div class="n">${money(EXPENSES.filter(x=>!x.unpaid&&x.date.startsWith(TODAY.slice(0,7))).reduce((a,x)=>a+x.amount,0))}</div><div class="l">本月开支</div></div>
      <div class="kpi"><div class="n">${money(s.net)}</div><div class="l">本月净额</div></div>
    </div>
    <p class="page-note">待收待付记在下面。项目列用合同号。统计截止 ${TODAY}</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>种类</th><th>方向</th><th>金额</th><th>科目</th><th>计入成本</th><th>发生日</th><th>项目</th><th>尚未付出</th></tr></thead><tbody>
      ${LEDGER.map(x=>`<tr><td>${esc(x.kind)}</td><td>${esc(x.dir)}</td><td>${money(x.amount)}</td><td>${esc(x.subject||'—')}</td><td>${x.cost?'是':'—'}</td><td>${esc(x.date)}</td><td>${esc(x.project||'—')}</td><td>${x.unpaid?'是':'—'}</td></tr>`).join('')}
    </tbody></table></div>
    <div class="pager"><span class="info">共 ${LEDGER.length} 条</span></div>
    <div class="block-title">收货款 <button class="btn btn-default btn-sm" onclick="openGoods()">记下收货款</button></div>
    <p class="page-note">分发客户这一单的货款。补差按这个客户自己的累计货款计算，不按分发回款。</p>
    ${GOODS.length?`<div class="table-wrap"><table class="data"><thead><tr><th>客户</th><th>发生日</th><th>金额</th><th>补差</th><th>平台</th><th>我方</th><th>规则</th></tr></thead><tbody>${GOODS.map(g=>`<tr><td>${esc(g.customer)}</td><td>${esc(g.date)}</td><td>${money(g.amount)}</td><td>${money(g.adjust)}</td><td>${money(g.platform)}</td><td>${money(g.ours)}</td><td>${esc(g.rule)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">暂无数据</div>'}
    <div class="block-title">日常开支 <button class="btn btn-default btn-sm" onclick="openExpense()">记下日常开支</button></div>
    ${EXPENSES.length?`<div class="table-wrap"><table class="data"><thead><tr><th>类别</th><th>发生日</th><th>到期日</th><th>金额</th><th>说明</th><th>尚未付出</th></tr></thead><tbody>${EXPENSES.map(e=>`<tr><td>${esc(e.category)}</td><td>${esc(e.date)}</td><td>${esc(e.due||'—')}</td><td>${money(e.amount)}</td><td>${esc(e.note||'—')}</td><td>${e.unpaid?'是':'—'}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">暂无数据</div>'}
    <div class="block-title">内部提成 <button class="btn btn-default btn-sm" onclick="openCommission()">记内部提成</button></div>
    ${COMMISSIONS.length?`<div class="table-wrap"><table class="data"><thead><tr><th>种类</th><th>归属人</th><th>项目</th><th>基数</th><th>比例</th><th>金额</th><th>到期日</th><th>状态</th></tr></thead><tbody>${COMMISSIONS.map(c=>`<tr><td>${esc(c.kind)}</td><td>${esc(c.owner)}</td><td>${esc(c.project)}</td><td>${money(c.base)}</td><td>${c.rate}%</td><td>${money(c.amount)}</td><td>${esc(c.due||'—')}</td><td>${esc(c.status)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">暂无数据</div>'}
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
    if(p&&dir==='收款') p.due=Math.round((p.due-amount)*100)/100;
    toast('已记账');render();
  });
}
function openGoods(){
  const distributed=customers.filter(c=>c.serviceType==='分发');
  openModule('记下收货款', `
    <p class="page-note">分发客户这一单的货款。补差按这个客户自己的累计货款计算。</p>
    <div class="form-group" id="gCustomerGroup"><label>客户 <span class="req">*</span></label><select class="input select" id="gCustomer" style="width:100%"><option value="">请选择</option>${distributed.map(c=>`<option value="${c.id}">${esc(c.name)} · ${c.id}</option>`).join('')}${distributed.length?'':'<option value="" disabled>还没有分发客户</option>'}</select><div class="form-error">请选择分发客户</div></div>
    <div class="form-row"><div class="form-group"><label>发生日</label><input class="input" type="date" id="gDate" value="${TODAY}" /></div><div class="form-group" id="gAmountGroup"><label>金额 <span class="req">*</span></label><input class="input" id="gAmount" /><div class="form-error">请填写金额</div></div></div>
  `, ()=>{
    const id=document.getElementById('gCustomer').value;
    const amount=Number(document.getElementById('gAmount').value);
    let ok=true;clearField('gCustomerGroup');clearField('gAmountGroup');
    if(!id){fieldError('gCustomerGroup');ok=false;}
    if(!(amount>0)){fieldError('gAmountGroup');ok=false;}
    if(!ok) return false;
    const c=customers.find(x=>x.id===id);
    const line=ruleValue('分发抽成分档线',100000);
    const rate=amount>line?ruleValue('超过10万的分发抽成比例',3):ruleValue('10万以内分发抽成比例',2.5);
    const platformRate=ruleValue('平台分成比例',20);
    const ours=Math.round(amount*rate)/100;
    const platform=Math.round(amount*platformRate)/100;
    GOODS.unshift({customer:c.name, date:document.getElementById('gDate').value, amount, adjust:0, platform, ours, rule:rate+'%'});
    toast('已记下收货款');render();
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
  return `<div class="block-title">${title}</div><div class="table-wrap"><table class="data"><thead><tr><th>${title.includes('阶段')?'阶段':title.replace('占比','').replace('分布','')}</th><th>数量</th><th>占比</th></tr></thead><tbody>
    ${rows.map(r=>`<tr><td>${esc(r.name)}</td><td>${r.n}</td><td>${(r.n/total*100).toFixed(1)}%</td></tr>`).join('')||'<tr><td colspan="3">暂无</td></tr>'}
  </tbody></table></div>`;
}
function renderBoard(){
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
  const overdue=todayItems().filter(t=>t.kind==='逾期跟进'||t.kind==='项目事项');
  pageShell(`
    <p class="page-note">统计截止 ${TODAY}。本月收入 ${money(s.income)}</p>
    ${kpiHtml(s)}
    <div class="block-title">今日必看</div>
    ${overdue.length?`<div class="table-wrap"><table class="data"><thead><tr><th>类别</th><th>事项</th><th>客户或项目</th><th>说明</th><th>操作</th></tr></thead><tbody>${overdue.map(t=>`<tr><td>${esc(t.kind)}</td><td>${esc(t.title)}</td><td>${esc(t.sub)}</td><td>${esc(t.detail)}</td><td><button class="btn btn-sm btn-primary" onclick="openWork('${t.view}','${t.id}')">去处理</button></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty-inline">今天没有逾期跟进、逾期项目或 3 天内待收</div>'}
    ${shareRows('渠道占比', by(customers,'channel'))}
    ${shareRows('分级分布', by(customers.map(c=>({grade:c.intent?c.intent+'级':'未分级'})),'grade'))}
    ${shareRows('跟进状态', by(customers,'status'))}
    ${shareRows('阶段分布', by(CONTRACTS,'stage'))}
    <div class="block-title">逾期项目</div>
    <div class="empty-inline">没有逾期项目</div>
    <p class="page-note">毛利率 =（订单总额 − 成本）÷ 订单总额。低于 ${low}% 标红，高于 ${high}% 写成本可能没录全。</p>
    <div class="table-wrap"><table class="data"><thead><tr><th>合同</th><th>阶段</th><th>订单总额</th><th>成本</th><th>毛利率</th><th>说明</th></tr></thead><tbody>
      ${margins.map(m=>`<tr><td>${esc(m.p.id)}</td><td>${esc(m.p.stage)}</td><td>${money(m.p.amount)}</td><td>${money(m.cost)}</td><td class="${m.cls}">${m.rate.toFixed(2)}%</td><td>${esc(m.note||'—')}</td></tr>`).join('')||'<tr><td colspan="6">还没有可算毛利率的合同</td></tr>'}
    </tbody></table></div>
  `);
}

function renderRules(){
  pageShell(`
    <p class="page-note">当前岗位 负责人。财务只能看。修改必须填原因。停用后这条规则不再参与计算，已写下的积分和抽成不会改写。</p>
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
    <p class="page-note">分发客户时从这里选。在这一页添加、修改、停用或删除。停用后分发列表不再出现，已经分出去的客户仍保留这家名字。</p>
    <div class="toolbar">
      <div class="toolbar-left"><button class="btn btn-primary" onclick="openDealer()">添加合作伙伴</button></div>
      <div class="toolbar-right"><div class="search-box ${q?'has-value':''}"><svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input placeholder="名称、城市、联系人或电话" value="${esc(q)}" oninput="state.dealerQ=this.value;render()" /><button class="clear" onclick="state.dealerQ='';render()" aria-label="清除">${iconClose()}</button></div></div>
    </div>
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
