/**
 * Originally configured in 2007-2015
 * Last updated by jbeach on 2017-05-12 WAP Upgrade Spring 2017 Part 2 (WAP Update 1.29.0.0) (CBUsr00460532)
 */


//helper functions
var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};
var mergeExtra = function(os, ky) {
    try{
        var fromCookie = false;
        var external = os.getQueryParam(ky);
        if ((external == null) || (external == '') || (external == 'undefined'))
        {
            external = readCookie(ky);
            fromCookie = true;
        }
        if (external && (external != null) && (external != '') && (external != 'undefined'))
        {
            var a=new Date;
            a.setTime(a.getTime()+3560*86400000); //10 years later
            var nvp = external.split('~');
            for (var i=0; i < nvp.length; i++)
            {
                var nv = nvp[i].split('|');
                var n = unescape(nv[0]);
                var v = unescape(nv[1]);
                var c = null;
                if (n == 'events')
                {
                    c = "os.events=os.apl(os.events,'" + v + "',',',1);";
                }
                else if (n == 'products')
                {
                    c = "os.products=os.apl(os.products,'" + v + "',',',1);";
                }
                else if (n == 'prop4')
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                    document.cookie = "ECL_LOGIN=" + v + ";path=/;domain=collegeboard.org";
                    os.c_w("member_status","ECL Member",a);
                }
                else if (n == 'eVar23')
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                    document.cookie = "eVar23=" + v + ";path=/;domain=collegeboard.org";
                    os.c_w("grad_year",v,a);
                }
                else if ((n == 'eVar24') || (n == 'eVar25'))
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                    document.cookie = n + "=" + v + ";path=/;domain=collegeboard.org";
                }
                else if (n == 'prop33')
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                    document.cookie = "prop33=" + v + ";path=/;domain=collegeboard.org";
                    os.c_w("member_type",v,a);
                }
                else if (n == 'prop56')
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                    document.cookie = "prop56=" + v + ";path=/;domain=collegeboard.org";
                    os.c_w("org_id",v,a);
                }
                else if ((n != null) && (v != 'undefined'))
                {
                    c = "os." + n + "=" + "'" + v + "'" + ";";
                }

                if (c != null)
                {
                    eval(c);
                }
            }

            // clear the cookie
            if (fromCookie)
            {
                var d = new Date();
                d.setTime ( d.getTime() - 1 );
                document.cookie = ky + "=;expires=" + d.toGMTString() + ";path=/" + ";domain=collegeboard.org";
            }
        }
    }catch(err)
    {
    }
};
var overWriteFromCookie = function(os, spn, cky, prfx) {
    try{
        var external = readCookie(cky);
        if (external && (external != null) && (external != '') && (external != 'undefined'))
        {
            if ((os.pageType == null) || (os.pageType != "errorPage"))
            {
                var c = "os." + spn + "='"+ prfx + external + "';";
                eval(c);
            }
            var d = new Date();
            d.setTime ( d.getTime() - 1 );
            document.cookie = cky + "=;expires=" + d.toGMTString() + ";path=/" + ";domain=collegeboard.org";
        }
    }catch(err)
    {
    }
};
var ajaxPage = function(pageName, channel) {
    ajaxPageCall=true;
    var s=s_gi(s_account);
    s.pageName=pageName;
    s.channel=channel;
    s.t();
};
var ajaxPageError= function(errorType, errorCode) {
    var s=s_gi(s_account);
    s.linkTrackVars='prop11,prop12,prop13';
    s.prop11=errorType;
    s.prop12=errorCode;
    s.prop13=s.pageName;
    s.tl(this,'o','ajax error tracking');
};


/* SiteCatalyst code version: H.27.4.
 Copyright 1996-2014 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com */

var s_account="clgbcollegeboardcomprod"
var s=s_gi(s_account)
var tcombo

//Mark Sawlor: 6/27/2015: adding the visitor ID service.
if(typeof Visitor != "undefined" && typeof Visitor.getInstance === "function"){
  s.visitor = Visitor.getInstance("5E1B123F5245B29B0A490D45@AdobeOrg");
}

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO_8859-1"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes=".arf,.avi,.css,.csv,.doc,.docx,.eps,.exe,.ics,.js,.m4v,.mov,.mp3,.mp4,.mpg,.pdf,.ppt,.pptx,.rar,.rm,.rtf,.swf,.tab,.txt,.vsd,.vxd,.wav,.wma,.wmv,.xls,.xlsx,.xml,.zip";
s.linkInternalFilters="javascript:,acquia-sites.com,apscore.org,cbapis.org,collegeboard.com,collegeboard.org,springboardonline.com,springboardonline.org";
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* Plugin Config */
/* Form Analysis Config (should be above doPlugins section) */
s.formList="CreateProfileForm,sdqInitForm,sdqCollegePlansForm,sdqCourseWorkForm,sdqActivitiesForm,sdqExtraInfoForm"
s.trackFormList=true
s.trackPageName=true
s.useCommerce=true
s.varUsed="eVar31"
s.eventList="event11" //Abandon,Success,Error

/******   Adobe variable to support IE cutoff issue ******/
var _lc=true;

//MS: 05/12/2015
//Page Visibility Event List (total page visibility seconds, total page seconds, total page visibility instances)
s.pvel='event83,event84,event85';

// jbeach: 03/16/2016
// WAP-67 capture Apple Device screen sizes */
if ((navigator.userAgent.indexOf('iPhone') > -1) || (navigator.userAgent.indexOf('iPad') > -1)) {
    s.prop67 = screen.width + 'x' + screen.height;
}

/* Page Name Plugin Config */
s.siteID=""            // leftmost value in pagename
s.defaultPage=""       // filename to add when none exists
s.queryVarsList="aclev,action,activity,applicationId,bf_cat,buttonPressed,category,codeSearchAction,decorator,dispatch"
+",e,erjob,examType,FAQID,filter,Form,forumId,fromPage,grab,isOnline,location,match,method,nav,navigateTo,New"
+",oq,page,pageIndex,pg,pid,preTest,qfs,relativePath,reportId,secondCategory,sectionCd,sku,src,Step,subjectId,t,tab,testYear"
+",thirdLevelCategory,tid,track,trackSubmitPage,trackViewPage,type,viewDesc"     // query parameters to keep
s.pathExcludeDelim=";" // portion of the path to exclude
s.pathConcatDelim=""   // page name component separator
s.pathExcludeList="VignetteServlet"   // elements to exclude from the path

/* GetActionDepth */
s.ActionDepthTest=true;
s.usePlugins=true

if(typeof ajaxPageCall=="undefined"){
  var ajaxPageCall=false;
}
/** 
 * A custom extension to allow for internal campaign tracking in eVar2 and event13
 * @module trackIntCampaign
 * @param {String} str - Required the internal campaing string to set to eVar2
 * @param {String} type - Optional the type of call to be made "inline" or "nextpage" the default is "inline"
 * @returns true, returns true in all cases.
 */
s.trackIntCampaign = function(str, type){
  try{
    if(str){      
      if(!type || type.toLowerCase()=="inline"){
        type = "inline";
        var tmplinkTrackVars = s.linkTrackVars;
        var tmplinkTrackEvents = s.linkTrackEvents;
        var tmpeVar2 = s.eVar2;
        var tmpevents = s.events;
        
        s.linkTrackVars="eVar2,events";
        s.linkTrackEvents="event13";
        s.eVar2=str;
        s.events="event13";
        s.tl(true,"o", "Internal Campaign : "+str);
        
        s.linkTrackVars=tmplinkTrackVars;
        s.linkTrackEvents=tmplinkTrackEvents;
        s.eVar2=tmpeVar2;
        s.events=tmpevents;
      }else if(type.toLowerCase()=="nextpage"){
          //do nothing right now Dropped as a requirement          
      };       
      return true;    
    }
  }catch(e){return true};
};

function s_doPlugins(s) {
/*populate host name */
s.prop20=s.wd.location.hostname?s.wd.location.hostname:'No Hostname';
s.prop58=document.location.protocol?document.location.protocol:'No Protocol Name';
/* check protocol prior to populating pagename */
if(!s.siteID) s.siteID=(s.wd.location.protocol.indexOf("http")==-1)?s.wd.location.protocol:'';

/*this section must execute prior to getPageName plugin */
/* populate siteID variable which is leftmost value in pagename */
if(!s.siteID) s.siteID=s.searchValue("advancedplacement.org;e,apexam.com;e,apexam.n"
+"et;e,apexam.org;e,boundforsuccess.com;e,boundforsuccess.net;e,bound"
+"forsuccess.org;e,clep.com;e,clep.org;e,clepprepcenter.com;e,college"
+"explorer.com;e,collegeexplorer.net;e,collegehandbook.com;e,collegeh"
+"andbook.net;e,countdowntocollege.net;e,expan.org;e,satlearningcente"
+"r.com;e,satlearningcenter.net;e,writeplacer.org;e",";",s.prop20,"www");
if(!s.siteID) s.siteID=s.searchValue("writingcommission.com;e,writingcommission.org;e",";",s.prop20,"WCO");
if(!s.siteID){
if(s.prop20.match('.collegeboard.org'))
{
s.temp_hi=(s.prop20.indexOf(".collegeboard.org")>-1)?s.prop20.indexOf(".collegeboard.org"):s.prop20.indexOf("collegeboard.org");
s.siteID=(s.temp_hi==0)?"www":(s.temp_hi>0)?s.prop20.substring(0,s.temp_hi):s.prop20;

}

else{
  s.temp_hi=(s.prop20.indexOf(".collegeboard.org")>-1)?s.prop20.indexOf(".collegeboard.org"):s.prop20.indexOf("collegeboard.org");
  s.siteID=(s.temp_hi==0)?"www":(s.temp_hi>0)?s.prop20.substring(0,s.temp_hi):s.prop20;
  }
  
  //added 11/22/2010 to remove www.host- from pageName
  if(s.prop20.match('.host-collegeboard.org'))
  s.temp_hi=(s.prop20.indexOf(".host-collegeboard.org")>-1)?s.prop20.indexOf(".host-collegeboard.org"):s.prop20.indexOf("host-collegeboard.org");
  s.siteID=(s.temp_hi==0)?"www":(s.temp_hi>0)?s.prop20.substring(0,s.temp_hi):s.prop20;

}

/* manage URL query parameters for SearchCenter */
if(s.getQueryParam('s_kwcid')) s.pageURL=s.manageQueryParam('s_kwcid',1,1);
s.hier1=s.wd.location; //set url
if(!s.hier2) s.hier2='No Value'; //set site section if empty

/* set pagename if not populated*/
if(!s.pageType && !s.pageName) s.pageName=s.getPageName();
/*Additional Cleanup on PageName*/
if(!s.pageType && s.pageName){
s.pageName=unescape(s.pageName);// handles standard decoding
s.pageName=unescape(s.pageName);// handles double decoding (doesn't hurt)
s.pageName=s.repl(s.pageName,'VignetteServlet.srv','') //remove vignette prefix from pagename
s.pageName=s.repl(s.pageName,'?relativePath=','') //remove ?relativePath= from pagename
/* remove www.host- from page name */
//s.pageName = s.pageName.replace("www.host-/","")

//patch 6/29/11 for Pagename containing www.collegeboard.com
if (s.pageName.indexOf('collegeboard.com') != -1)
{s.pageName=s.repl(s.pageName,'.collegeboard.com','')}//remove collegeboard.com  from pagename

var temp=s.getQueryParam('applicationid');
if((s.pageName=="ecl:registrationpage")&& temp)s.pageName="ecl:registrationpage?applicationId="+temp;
s.pageName=s.pageName.toLowerCase();
s.eVar4=s.pageName;
}


/* populate additional vars from query string */
if(!s.prop31) s.prop31=s.getQueryParam('item,Itemkey');
if(!s.products && s.getQueryParam('item,itemkey') && s.getQueryParam('item,itemkey')!='True') s.products=";"+s.getQueryParam('item,itemkey');
s.prop21=s.getQueryParam('collegeId');
s.prop22=s.getQueryParam('profileId');
s.prop23=s.getQueryParam('newAccount');
s.prop34=s.getQueryParam('vgnextoid');


s.temp_ut_search=readCookie('UT_SEARCH');

if(s.temp_ut_search && s.temp_ut_search != null && s.temp_ut_search.length > 0) {
/* parse out the banner_id */ 
  s.temp_ut_search = s.temp_ut_search.substring(0, s.temp_ut_search.lastIndexOf('~')); 
  s.eVar12 = s.repl(s.temp_ut_search,'~',':');
}

/* Populate Campaign Variables from query string if not set */
if(!s.eVar2) {   
  s.temp_affiliateId = s.getQueryParam('affiliateID');   
  s.temp_bannerId = s.getQueryParam('bannerid');   
  if(s.temp_affiliateId || s.temp_bannerId) {   
       s.eVar2 = s.temp_affiliateId + ":" + s.temp_bannerId;   
  }   
 } 

s.eVar39=s.getQueryParam('etId');
if(!s.eVar12)s.eVar12=s.getQueryParam('s_kwcid');
if(!s.campaign)s.campaign=s.getQueryParam('excmpid');
/* Tracking non-deduped campaign click events */
if(s.campaign)s.events=s.apl(s.events,'event30',',',1);

if((s.getQueryParam('ep_mid')||s.getQueryParam('ep_rid')) && !s.campaign )
{
 s.eVar42=s.getQueryParam('ep_rid')
 s.campaign=s.getQueryParam('ep_mid')
}

var temp=s.getQueryParam('ep_mid')+s.getQueryParam('ep_rid')

var clicks=s.c_r('s_temp')

if(clicks!=null&&!(clicks.indexOf(temp)>-1))s.events=s.apl(s.events,'event40',',',1);

//clicks=s.crossVisitParticipation(temp,'s_temp','30','5','>','',0);


/* Deduplicate Instances of Campaign Variables to 30 day expiration */
s.campaign=s.getValOnce(s.campaign,'s_v0',30);
s.eVar12=s.getValOnce(s.eVar12,'s_v12',30);
s.eVar39=s.getValOnce(s.eVar39,'s_v39',30);

/* populate campaign pathing variable */
//s.prop17=s.setCustomPath(s.campaign,'s_v0','ExtCmp=',s.pageName);

//set previous page name for all pages
s.prop52=s.getPreviousValue(s.pageName,'gpv_p52','');

/* Populate Search Phrase */
if(!s.prop1) s.prop1=s.getQueryParam('q,word,qt,searchq');

/* Populate & Copy Search Type */
if(!s.prop3) s.prop3=s.getQueryParam('searchType');
if(s.prop3) s.eVar3=s.prop3;
var event3Set = false; 
/* Copy search term to eVar */
if(s.prop1){
    /* Lowercase variables */
    s.prop1=s.prop1.toLowerCase();
    /* if no results, modify search query for pathing purposes */
    if(s.prop2=="0"||s.prop2=="zero"||s.prop2=="null") s.prop1="null:"+s.prop1;
    s.eVar1=s.prop1;
    
    var t_search=s.getValOnce(s.eVar1,'s_v1',0);
  if (t_search) {
  if((s.events+",").indexOf('event1,') == -1){
    s.events=s.apl(s.events,'event1,event49',',',2);
  }
  else {
    s.events=s.apl(s.events,'event49',',',2);
  }
    if(s.eVar3=='college') { s.events=s.apl(s.events,'event4',',',1); }
    else if(s.eVar3=='site_qfs') { s.events=s.apl(s.events,'event4',',',1); }
    else if(s.eVar3=='ex_qfs') { s.events=s.apl(s.events,'event4',',',1); }
    else if(s.eVar3=='site') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='adv_site') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='site_sug') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='site_rel') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='aps_site') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='clepsite') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='studentsite') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='satsite') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='bf_site') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='bf_site_rel') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='bf_site_sug') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3=='bf_site_c') { s.events=s.apl(s.events,'event63',',',1); }
    else if(s.eVar3=='bf_site_m') { s.events=s.apl(s.events,'event64',',',1); }
    else if(s.eVar3=='scholarship') { s.events=s.apl(s.events,'event26',',',1); }
    else if(s.eVar3=='adv_satsite') { s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
    else if(s.eVar3.match('site')){s.events=s.apl(s.events,'event3',',',1); event3Set = true;}
  }
}
// set previous page name if a site search occured and previous page (prop52) isn't null or empty 
if(event3Set && typeof s.prop52 != "undefined" && s.prop52 && s.prop52 != ""){ s.eVar35="D=c52";}


/* Plugin Example: getNewRepeat 1.0 */
s.prop16=s.getNewRepeat();
if(s.prop16) s.eVar13=s.prop16

/* Plugin Example: timeparting EST */
/* 5/15/2017:
Stop the flow of this data - replaced with new props in AppMeasurement upgraded code --jbeach
Some of these props will be re-purposed after 6/1/2017 so we need to stop the flow of this data for now.
var t_calcDate = new Date();
var t_fullYear = t_calcDate.getFullYear();
s.prop6=s.getTimeParting('h','-5',t_fullYear); // Set hour
s.prop7=s.getTimeParting('d','-5',t_fullYear); // Set day
s.prop8=s.getTimeParting('w','-5',t_fullYear); // Set Weekend / Weekday
s.prop35 = s.getRoundHour('h','-5',t_fullYear); //5:23PM will return 5:00PM
s.prop36 = s.getRoundHour('m','-5',t_fullYear); //5:23PM will return 5:23PM
*/

/* move up mergeExtra, and modify prop4 cookie, July 10, 2008*/
mergeExtra(s, 'WAP_EXTERNAL_PROPERTIES');

/* populate logged info from session cookie */
s.prop4=readCookie('ECL_LOGIN');
if(!s.eVar23) s.eVar23=readCookie('eVar23');
if(!s.eVar24) s.eVar24=readCookie('eVar24');
if(!s.eVar25) s.eVar25=readCookie('eVar25');
if(!s.prop33) s.prop33=readCookie('prop33');
if(s.c_r('member_type')) { s.prop39=s.c_r('member_type')+" Member";s.prop41=s.c_r('member_type')+" Member:"+s.pageName; } else { s.prop39="Non-Member"; s.prop41="Non-Member:"+s.pageName; }
if(!s.prop56) s.prop56=readCookie('prop56');
if(s.c_r('org_id')) { s.prop56=s.c_r('org_id'); }
s.eVar5=s.prop56; // jbeach: 3/16/2016: WAP-70
s.eVar22=s.prop39;
if(s.eVar23) s.prop40=s.eVar23;
/* populate logged info and grad year from permanent cookie*/
if(s.c_r('grad_year')) s.prop42=s.c_r('grad_year')+":"+s.pageName;//pathing for grad_year
//if(s.c_r('member_status')) { s.prop41=s.c_r('member_status')+":"+s.pageName; } else { s.prop41="Non-Member:"+s.pageName; }

/* populate the IPE info */
s.prop32=readCookie('prof_settings=persona');
s.evar28=readCookie('prof_settings=persona');

/* copy Vars */
if(s.prop4){
s.eVar17=s.prop4;
s.prop9="Logged In";
}
else s.prop9="Not Logged In";
if(s.prop9) s.eVar21=s.prop9;
/* 5/15/2017: see note above - jbeach
if(s.prop6) s.eVar6=s.prop6;
if(s.prop7) s.eVar7=s.prop7;
if(s.prop8) s.eVar8=s.prop8;
    */

/*set Tool Type for Pathing COMMENTED OUT 8/16/12*/
/*if(s.eVar14){
s.prop14=s.eVar14;
if(s.events.indexOf("event3")) s.prop14=s.prop14+":start";
else if(s.events.indexOf("event4")) s.prop14=s.prop14+":complete";
}*/

/* Plugin Example: formAnalysis 2.1  */
s.setupFormAnalysis();

/* Plugin Example: getDaysSinceLastVisit 1.0 */
s.eVar20=s.getDaysSinceLastVisit('s_lastvisit');

/* Set Internal Campaign Variables */
s.AdIds=s.getLinkParams('bannerid');
if(s.AdIds.length>0){
for(t=0;t<s.AdIds.length;t++){
  if(s.AdIds[t]!=''&&s.AdIds[t].indexOf('#')<0){
    s.adsprs=true;
    s.products=s.apl(s.products,"ads;"+s.AdIds[t],",",2);
    s.events=s.apl(s.events,"event12",",",2);
    }
  }
}


/* Set Internal Campaign Click */
if (s.eVar2){
  s.tmpadv=s.eVar2;
  if(s.products && s.products.indexOf(s.tmpadv)>-1)s.products=s.repl(s.products,s.tmpadv,s.tmpadv);
  else s.products=s.apl(s.products,"ads;"+s.eVar2,",",2);
  s.events=s.apl(s.events,"event13",",",2);
}
/* Deduplicate Instances of Internal Campaign Variable to 30 day expiration */
s.eVar2=s.getValOnce(s.eVar2,'s_v2',30);

/* GL --> START CQTicket CBUsr00043524 01/09/2008 */

s.events=s.apl(s.events,'event7',',',2)

/* GL --> END CQTicket CBUsr00043524 01/09/2008 */

/* Plugin Example: linkHandler v0.5 */
s.linkLeaveQueryString=true;
s.exiturl=s.exitLinkHandlerQP('DestURL');
s.dl_filetypes=s.repl(s.linkDownloadFileTypes,',','|');
s.dl_url=s.linkHandler(s.dl_filetypes,'d');
if(s.exiturl){
  // save pre-linkHandler variable values
  s.prop24_original = s.prop24;
  s.prop25_original = s.prop25;
  s.ltv_original = s.linkTrackVars;
  // set linkHandler-specific variable values
  s.linkTrackVars="prop24,prop25";
  s.prop24=s.exiturl;
  s.prop25=s.pageName;
}
else if(s.dl_url){
  // save pre-linkHandler variable values
  s.siteID_original = s.siteID;
  s.temp_hi_original = s.temp_hi;
  s.prop10_original = s.prop10;
  s.prop17_original = s.prop17;
  s.prop20_original = s.prop20;
  s.prop25_original = s.prop25;
  s.eVar4_original = s.eVar4;
  s.hier1_original = s.hier1;
  s.hier2_original = s.hier2;
  s.prop58_original = s.prop58;
  s.ltv_original = s.linkTrackVars;
  // set linkHandler-specific variable values
  s.linkTrackVars="prop10,prop25,eVar4,hier1,hier2,prop4,prop9,prop16,prop17,prop20,prop58";
  /* use param 'url' in cases where file download url is part of query string instead of direct link */         
  s.dl_url_param=s.getQueryParam('url','',s.dl_url)
  if(s.dl_url_param) { s.dl_url_aclev_param=s.getQueryParam('aclev','',s.dl_url); 
      if(s.dl_url_aclev_param){ s.dl_url=s.dl_url_aclev_param+'/'+s.dl_url_param; } else{ s.dl_url=s.dl_url_param;}}
  s.prop20=s.repl(s.dl_url,'http://','');
  s.prop20=s.repl(s.prop20,'https:///','');
  s.prop20=s.prop20.substring(0,s.prop20.indexOf('../../../../index.html'));
  s.prop58=document.location.protocol?document.location.protocol:'no protocol name';
  /*set up siteId to pass correct value in link instead of in current url*/
  s.siteID=s.searchValue("advancedplacement.org;e,apexam.com;e,apexam.n"
  +"et;e,apexam.org;e,boundforsuccess.com;e,boundforsuccess.net;e,bound"
  +"forsuccess.org;e,clep.com;e,clep.org;e,clepprepcenter.com;e,college"
  +"explorer.com;e,collegeexplorer.net;e,collegehandbook.com;e,collegeh"
  +"andbook.net;e,countdowntocollege.net;e,expan.org;e,satlearningcente"
  +"r.com;e,satlearningcenter.net;e,writeplacer.org;e",";",s.prop20,"www");
  if(!s.siteID) s.siteID=s.searchValue("writingcommission.com;e,writingcommission.org;e",";",s.prop20,"WCO");
  if(!s.siteID){
  if(s.prop20.match('.collegeboard.org'))
  {
    s.temp_hi=(s.prop20.indexOf(".collegeboard.org")>-1)?s.prop20.indexOf(".collegeboard.org"):s.prop20.indexOf("collegeboard.org");
    s.siteID=(s.temp_hi==0)?"www":(s.temp_hi>0)?s.prop20.substring(0,s.temp_hi):s.prop20;

  }

  else{
  s.temp_hi=(s.prop20.indexOf(".collegeboard.org")>-1)?s.prop20.indexOf(".collegeboard.org"):s.prop20.indexOf("collegeboard.org");
  s.siteID=(s.temp_hi==0)?"www":(s.temp_hi>0)?s.prop20.substring(0,s.temp_hi):s.prop20;
  }
  }
  
  s.prop10=s.getPageName(s.dl_url);
  s.prop10=unescape(s.prop10);// handles standard decoding
  s.prop10=unescape(s.prop10);// handles double decoding (doesn't hurt)
  s.prop10=s.repl(s.prop10,'VignetteServlet.srv','') //remove vignette prefix from pagename
  s.prop10=s.repl(s.prop10,'?relativePath=','') //remove ?relativePath= from pagename
  s.prop17=s.setCustomPath(s.campaign,'s_v0','ExtCmp=',s.prop10);
  s.eVar4=s.prop10;
  s.hier1=s.dl_url;
  s.hier2="No Value";
  s.prop25=s.pageName;
  
  // Patch to remove domain from s.prop10 in File Downloads
  var prop10DomainRemove=s.prop10;
  if(prop10DomainRemove.indexOf('collegeboard.com') != -1){
  s.prop10=prop10DomainRemove.replace('.collegeboard.com','')
  }
  if(prop10DomainRemove.indexOf('collegeboard.org') != -1){
  s.prop10=prop10DomainRemove.replace('.collegeboard.org','')
  }
  s.prop10=s.prop10.toLowerCase();
}
else {
  // restore pre-linkHandler variable values
  if(s.ltv_original) s.linkTrackVars=s.ltv_original;
  if(s.siteID_original) s.siteID=s.siteID_original;
  if(s.temp_hi_original) s.temp_hi=s.temp_hi_original;
  if(s.prop10_original) s.prop10=s.prop10_original;
  if(s.prop17_original) s.prop17=s.prop17_original;
  if(s.prop20_original) s.prop20=s.prop20_original;
  if(s.prop24_original) s.prop24=s.prop24_original;
  if(s.prop25_original) s.prop25=s.prop25_original;
  if(s.eVar4_original) s.eVar4=s.eVar4_original;
  if(s.hier1_original) s.hier1=s.hier1_original;
  if(s.hier2_original) s.hier2=s.hier2_original;
  if(s.prop58_original) s.prop58=s.prop58_original;
  }
s.linkLeaveQueryString=false;

// end of channel manager code

/* Set Landing Page and Second Page Event */

  if(s.ActionDepthTest){
    s.pdvalue=s.getActionDepth("s_depth");
    if(s.pdvalue == 1) {
      s.events=s.apl(s.events,'event38',',',2)
    }

    if(s.pdvalue == 2)
      s.events=s.apl(s.events,'event39',',',2)
    }
  s.ActionDepthTest=false;


//PATCH FOR event47 and  s.purchase - 6/13/2011
if(s.pageName.toLowerCase().indexOf('step4:orderconfirmation')!=-1)
  {
  s.events=s.apl(s.events,'purchase',',',2)
  }
//END PATCH


//For Refined Search 
if(s.getQueryParam('q1,program,topic'))
{s.eVar52=s.getQueryParam('q1,program')}
//END Refined Search

var tref=document.referrer

var turl=document.URL

if(tref)
{
var refar=tref.split('../../../../index.html');

refar=refar[2].replace('www.','');

if(!(s.linkInternalFilters.indexOf(refar)>-1))
tcombo=tref+turl

}
else if(!tref)tcombo=turl

tcombo=s.getValOnce(tcombo,'s_tcombo',30)

if(tcombo)s.hier3="true"

if(tcombo)
{
if(s.getQueryParam('campaignId'))
s.eVar38=s.getQueryParam('campaignId')
else if(s.getQueryParam('ep_ch')) s.eVar38=s.getQueryParam('ep_ch')
}


s.tnt=s.trackTNT();

//Global Navigation Tracking per Adobe Consultant Greg Clausen 8/16/12
  if( !s.prop49 ){
    s.prop49 = s.getQueryParam('navid').toLowerCase();
    if( s.prop49 ) {
      s.prop49 = s.getValOnce(s.prop49, 's_navid', 0);
      if( s.prop49 ) {
        s.eVar61 = s.prop49;
        s.events = s.apl(s.events, 'event70', ',' ,2);
      }
    }
  }

/* Internal Campaign Impressions per Adobe Consultant Greg Clausen 8/16/12 - WILL NOT WORK
if(s.doesPageHaveHouseBannerAdd()){ s.events = s.apl( s.events, 'eventY', ',', 2 ) };

// Internal Campaign Clicks
if(!s.eVarX) {   
      s.temp_affiliateId = s.getQueryParam('affiliateID');   
      s.temp_bannerId = s.getQueryParam('bannerid');   
      if(s.temp_affiliateId || s.temp_bannerId) {   
            s.eVarX = s.temp_affiliateId + ":" + s.temp_bannerId;
            s.events = s.apl(s.events,'eventZ',',',2);  
      }   
}
*/

// set prevPage to value getPreviousValue returns
s.prevPage=s.getPreviousValue(s.pageName,"prevPage");
if( s.pageName && s.pageName.match("404errorpage") ) {
  s.prop51=s.prevPage;
}


/* 5/15/2017:
Some of this prop will be re-purposed after 6/1/2017 so we need to stop the flow of this data for now.
//MS: 1/21/2014 
 s.detectRIA('s_ria','prop57','','','',''); */

//Set all Page Names to Lower Case - 11072011
s.pageName=s.pageName.toLowerCase();
s.eVar4=s.pageName;
s.prop20=s.prop20.toLowerCase();
s.prop58=s.prop58.toLowerCase();
//Code to clear variables on Ajax Page Call
if(ajaxPageCall){
s.events="event7";
s.campaign=""; // Campaign Variable Clear
s.eVar1="";// Internal Search Terms Clear
s.prop1="";// Internal Search Terms Clear
s.prop2="";// Internal # of Search Results Clear
s.eVar2="";//Internal Campaign Clear
s.prop3="";//Internal Search Type Clear
s.eVar3=""//Internal Search Type Clear
}

//MS: 05/12/2015
s.eVar68=s.prop61=s_getLoadTime();
if(s_getLoadTime())s.events=s.apl(s.events,'event86='+s_getLoadTime(),',',1);

/* Page Visibility */
//MS: REQUIRES APP MEASUREMENT
//s.eVar69 = s.getPreviousValue(s.pageName,'gpv_v69',''); 
//s.getPageVisibility();

/* jbeach: 03/17/2016: WAP-68 capture newAccount page name */
if (s.getQueryParam('newAccount')) {
    s.prop68 = s.pageName;
}


/* Channel Manager */
s.channelManager('excmpid,ep_mid,s_kwcid,ef_id', '', 'cmgvo', '', 's_tbm', 60);
if(s._channel == 'Typed/Bookmarked') s._channel = 'Direct';
else if(s._channel == 'Unknown Paid Channel') s._channel = 'All Other Campaigns';
else if(s._channel == 'Natural Search') s._channel = 'Organic Search';
else if(s._channel == 'Other Natural Referrers') s._channel = 'Other Sites';
//_satellite.notify('Channel settings: _channel: '+ s._channel +'; _referrer: '+ s._referrer +'; _referringDomain: '+ s._referringDomain +'; _partner: '+ s._partner +'; _keywords: '+ s._keywords +'; _campaignID: '+ s._campaignID +'; _campaign: '+ s._campaign);
if (s._channel) s.eVar67 = s._channel; //Marketing Channel Participation
/* end Channel Manager */



ajaxPageCall=false;
}

s.doPlugins=s_doPlugins



/*********Media Module Calls**************/
s.loadModule("Media")
/*Configure Media Module Functions */
s.Media.autoTrack= false;
s.Media.trackMilestones="25,50,75,100";
//s.Media.playerName="My Media Player";
s.Media.segmentByMilestones = true;
s.Media.trackUsingContextData = true;
s.Media.trackWhilePlaying = true;
s.Media.trackVars="eVar56,prop47,eVar57,eVar58,eVarevents";
s.Media.trackEvents="event51,event52,event54,event60,event61,event62,event63";
s.Media.contextDataMapping = {
  "a.media.name":"eVar56,prop47",
  "a.media.segment":"eVar57",
  "a.media.timePlayed":"event51",
  "a.media.view":"event52",
  "a.media.segmentView":"event54",
  "a.media.playerName":"eVar58",
  "a.media.milestones":{
    25:"event60",
    50:"event61",
    75:"event62",
    100:"event53"
  }
}

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*                                                                                        
 * Plugin: getLoadTime : 1.0 - Gets the page load time in tenths of a second and lets you store the value in a prop, eVar, and/or a numeric event. 
 */
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT};

/*
 * Plugin: getVisitStart v2.0 - returns 1 on 1st page of visit, else 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;"); 

/* Page Visibility Plugin 0.1 (BETA) */
s.getPageVisibility=new Function("",""
+"var s=this;if(s.getVisitStart()){s.Util.cookieWrite('s_pvs','');s.U"
+"til.cookieWrite('s_tps','');}if(s.Util.cookieRead('s_pvs')&&s.pvt<1"
+"){if(parseInt(s.Util.cookieRead('s_pvs'))<=parseInt(s.Util.cookieRe"
+"ad('s_tps'))){s.pve=s.pvel.split(',');s.events=s.apl(s.events,s.pve"
+"[0]+'='+(parseInt(s.Util.cookieRead('s_pvs'))),',',2);s.Util.cookie"
+"Write('s_pvs','');s.events=s.apl(s.events,s.pve[1]+'='+(parseInt(s."
+"Util.cookieRead('s_tps'))),',',2);s.Util.cookieWrite('s_tps','');s."
+"events=s.apl(s.events,s.pve[2],',',2);}}s.pvi=setInterval(s.pvx,100"
+"0);s.wpvi=setInterval(s.wpvc,5000);");
s.gbp=new Function("",""
+"if('hidden'in document){return null;}var bp=['moz','ms','o','webkit"
+"'];for(var i=0;i<bp.length;i++){var p=bp[i]+'Hidden';if(p in docume"
+"nt){return bp[i];}}return null;");
s.hp=new Function("p",""
+"if(p){return p+'Hidden';}else{return'hidden';}");
s.vs=new Function("p",""
+"if(p){return p+'VisibilityState';}else{return'visibilityState';}");
s.ve=new Function("p",""
+"if(p){return p+'visibilitychange';}else{return'visibilitychange';}");
s.pvx=new Function("",""
+"s.pvt+=1;");
s.wpvc = function(){var tempDate = Date.now();s.Util.cookieWrite('s_tps',
Math.ceil((tempDate - s.totalTime)/1000));s.Util.cookieWrite('s_pvs', s.pvt)}
document.addEventListener('visibilitychange',function(event){if(document.hidden){s.visibility = false;clearTimeout(s.pvi);}else{s.visibility=true;s.pvi=setInterval(s.pvx,1000);}});s.totalTime=new Date();s.pvt=0;s.prefix=s.gbp;s.hidden=s.hp(s.prefix);s.visibility=true;s.visibilityState=s.vs(s.prefix);s.visibilityEvent=s.ve(s.prefix);

/*                                                                                        
 * Plugin: searchValue : 1.0 - searches string and returns value 
 */
s.searchValue=new Function("p","d","u","vu",""
+"var s=this,i,t,k,dl,mv,mm,rv,x;while(p){i=p.indexOf(',');i=i<0?p.le"
+"ngth:i;k=p.substring(0,i);dl=k.indexOf(d);mv=k.substring(0,dl);mm=k"
+".substring(dl+1);u=u+'';rv=vu?vu:mv;if(mm=='e'){x=u.indexOf(mv);if("
+"x>-1) return rv;}else{x=u.substring(mm,mv.length);if(mv==x) return "
+"rv;}p=p.substring(i==p.length?i:i+1)}return ''");
/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var s=this,f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var s=this,f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
/*
 *	getQueryParam v2.5 - H-code and AppMeasurement Compatible
 */
s.getQueryParam=function(p,d,u,h){var s=this,v="",i,j,t;d=d?d:"";u=u?u:s.pageURL?s.pageURL:s.wd?s.wd.location:window.location;while(p){i=p.indexOf(",");i=i<0?p.length:i;t=s.p_gpv(p.substring(0,i),u+"",h);if(t)t=t.indexOf("#")>-1?t.substring(0,t.indexOf("#")):t;if(t)v+=v?d+t:t;p=p.substring(i==p.length?i:i+1)}return v};
s.p_gpv=function(k,u,h){var s=this,v="",q;j=h==1?"#":"?";i=u.indexOf(j);if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,"&","p_gvf",k)}return v};
s.p_gvf=function(t,k){if(t){var s=this,i=t.indexOf("="),p=i<0?t:t.substring(0,i),v=i<0?true:t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa?s.epa(v):s.unescape(v)}return""};
/* Plugin: channelManager v3.06 */
s.channelManager=function(a,b,c,d,e,f,g){var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V;U=s.getQueryParam?1:0;V=s.repl?1:0;if(e){i=1;if(s.c_r(e))i=0;h.setTime(h.getTime()+18E5);s.c_w(e,1,h);if(f&&s.c_r("s_tbm"+e+f.toString()))i=0}j=s.referrer?s.referrer:document.referrer;if(j=="Typed/Bookmarked")j="";j=decodeURIComponent(j.toLowerCase());if(!j)k=1;else{l=j.indexOf("?")>-1?j.indexOf("?"):j.length;m=j.substring(0,l);n=j.split("../../../../index.html");n=n[2].split("?");
    o=n[0].toLowerCase();p=s.linkInternalFilters.toLowerCase();p=p.split(",");for(q=0;q<p.length;q++){r=o.indexOf(p[q])==-1?"":j;if(r)break}}if(!r&&!k){t=j;u=o;w="Other Natural Referrers";v=w+": "+o;x=s.seList+">"+s._extraSearchEngines;if(d==1){m=V?s.repl(m,"oogle","%"):s.replace(m,"oogle","%");m=V?s.repl(m,"ahoo","^"):s.replace(m,"ahoo","^");j=V?s.repl(j,"as_q","*"):s.replace(j,"as_q","*")}y=x.split(">");for(z=0;z<y.length;z++){A=y[z];A=A.split("|");B=A[0].split(",");for(C=0;C<B.length;C++){D=m.indexOf(B[C]);
    if(D>-1){if(A[2])E=v=A[2];else E=o;if(d==1){E=V?s.repl(E,"#"," - "):s.replace(E,"#"," - ");j=V?s.repl(j,"*","as_q"):s.replace(j,"*","as_q");E=V?s.repl(E,"^","ahoo"):s.replace(E,"^","ahoo");E=V?s.repl(E,"%","oogle"):s.replace(E,"%","oogle")}F=A[1].split(",");for(G=0;G<F.length;G++){if(j.indexOf(F[G]+"=")>-1||j.indexOf("duckduckgo")>-1||j.indexOf("googlequicksearchbox")>-1||j.indexOf("http://www.google./")==0||j.indexOf("https://www.google./")==0||j.indexOf("https://search.yahoo.com/")==0||j.indexOf("http://r.search.yahoo.com/")==
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               0||j.indexOf("https://www.bing.com/")==0)H=1;I=U?s.getQueryParam(F[G],"",j).toLowerCase():s.Util.getQueryParam(F[G],j).toLowerCase();if(H||I)break}}if(H||I)break}if(H||I)break}}if(!r||g!="1"){J=a.split(",");for(var q in J)if(J.hasOwnProperty(q))if(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q]))if(b)T=T?T+b+(U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q])):U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q]);else{T=U?s.getQueryParam(J[q]):s.Util.getQueryParam(J[q]);if(T)break}if(T){v=T;if(E)w=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  "Paid Search";else w="Unknown Paid Channel"}if(!T&&E&&H){w="Natural Search";v=w+": "+E}}if(i&&k&&!T)t=u=v=w="Typed/Bookmarked";J=s._channelDomain;if(J&&o&&!r){K=J.split(">");for(L=0;L<K.length;L++){M=K[L]?K[L].split("|"):"";N=M[1]?M[1].split(","):"";O=N.length;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=("/"+o).indexOf(Q);if(R>-1){w=M[0];v=T?v:w+": "+o;break}}if(R>-1)break}}J=s._channelParameter;if(J&&g!="1"){K=J.split(">");for(L=0;L<K.length;L++){M=K[L]?K[L].split("|"):"";N=M[1]?M[1].split(","):"";O=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      N.length;for(P=0;P<O;P++){R=U?s.getQueryParam(N[P]):s.Util.getQueryParam(N[P]);if(R){w=M[0];v=T?v:w+": "+o;break}}if(R)break}}J=s._channelPattern;if(J&&g!="1"&&T){K=J.split(">");for(L=0;L<K.length;L++){M=K[L]?K[L].split("|"):"";N=M[1]?M[1].split(","):"";O=N.length;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=T?T.toLowerCase():"";S=R.indexOf(Q);if(S==0){w=M[0];break}}if(S==0)break}}S=w?T+u+w+I:"";c=c?c:"c_m";if(c!="0")S=s.getValOnce(S,c,0);if(S){s._campaignID=T?T:"n/a";s._referrer=t?t:"n/a";s._referringDomain=
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                u?u:"n/a";s._campaign=v?v:"n/a";s._channel=w?w:"n/a";s._partner=E?E:"n/a";s._keywords=H?I?I:"Keyword Unavailable":"n/a";if(f&&w!="Typed/Bookmarked"){h.setTime(h.getTime()+f*864E5);s.c_w("s_tbm"+e+f.toString(),1,h)}}else s._campaignID=s._referrer=s._referringDomain=s._campaign=s._channel=s._partner=s._keywords=""};
/* channelManager seList (Top 40 Search Engines) */
s.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask.co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>webcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>duckduckgo.com|q|DuckDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baidu.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Yandex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthlink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.co|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|MSN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick.com>sogou.com|query|sogou.com>360.cn|q|360.cn";
s._channelDomain="Partner Sites|khanacademy.org,roadtripnation.com,epiconline.org,accuplacer.org"
s._channelParameter="Email|ep_mid"
s._channelPattern="External Email|ex>SMS|tx>Offline Marketing|mtg,cb,dm>Online Media|oc>Social Media|sm,fb>Affiliates|af>Vanity URLs|vt>Partner Sites|pt"
/*
 *  Plugin: Custom Banner Ad
 */
s.getLinkParams=new Function("p",""
+"var s=this,o='onclick',a=new Array(),ath=0,l,ll;if(s.d.links){for"
+"(var i=0;i<s.d.links.length;i++){l=s.d.links[i];ll=l.href.toLowerCase"
+"();if(ll.indexOf(p.toLowerCase())>0){a[ath]=s.getQueryParam(p,'',"
+"l.href+'');ath+=1;}}return a}");
/* 
 * Plugin: Internal Campaign Exists. - Returns "true" when there is at least one internal campaign (anchor element) on the page that has an href element that contains "bannerid" and "affiliateid". 
 */
s.doesPageHaveHouseBannerAdd=new Function(""
+"var s=this;var allAnchors=document.getElementsByTagName('a');"
+"for(var i = 0;i<allAnchors.length;i++){var an=allAnchors.item(i);"
+"if(an.href.length>-1){"
+"if(an.href.toLowerCase().indexOf('bannerid')>-1){"
+"if(an.href.toLowerCase().indexOf('affiliateid')>-1){"
+"return true;}}}}return false;");
/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
/* 
 * Plugin: setCustomPath v1.0 
 */
s.setCustomPath=new Function("v","c","p","pt",""
+"var s=this,pt=pt?pt:'no value sent',k=s.c_r(c);if(v){return p+v+':'"
+"+pt} else return k?pt:'';");
/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone
 */
s.getTimeParting=new Function("t","z","y",""
+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};"
);
/*
 * from CBUsr00047792, April 25, 2008
 */
s.getRoundHour=new Function("t","z","y",""
+"dc = new Date('1/1/2000');var f = 15;var ne = 8;"
+"if(dc.getDay() !=6 || dc.getMonth()!=0){return 'Data Not Available';}"
+"else{z=parseInt(z);if(y=='2009'){f=8;ne=1;}gmar=new Date('3/1/'+y);"
+"dsts=f-gmar.getDay();gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();"
+"spr=new Date('3/'+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);"
+"cd=new Date();if(cd > spr && cd<fl){z=z+1;}"
+"else{z=z;}utc=cd.getTime() + (cd.getTimezoneOffset() * 60000);"
+"tz = new Date(utc + (3600000*z));thisy = tz.getFullYear();"
+"thish = tz.getHours();thismin=tz.getMinutes(); var ap = 'AM';var mint = '00';"
+"if(thish >=  12){ap = 'PM';thish=thish-12;}"
+"if(thish==0){thish=12;}if(thismin<10){thismin='0'+thismin;}"
+"if(t=='h'){var timestring=thish+':' +mint+ap;}"
+"if(t=='m'){var timestring=thish+':' +thismin+ap;}}return timestring;");
/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else return cval_s;");
/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName=new Function("u",""
+"var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");
/* 
* START Plugin: cool click tracking function (requires s.split and s.apl)
*/
s.setupLinkTrack=new Function("vl","c",""
+"_lc=true;var s=this;var l=s.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s."
+"c_r(c);if(vl&&cv!=''){cva=s.split(cv,'^^');vla=s.split(vl,',');for("
+"x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s.c_w(c,'',0);if(!s.e"
+"o&&!s.lnk)return '';o=s.eo?s.eo:s.lnk;y=s.ot(o);n=s.oid(o);if(s.eo&"
+"&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"
+":o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);}for(i=0;i<4;i++"
+")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"
+"ase()!='area')o=o.parentElement;}b=s._LN(o);o.lid=b[0];o.lpos=b[1];"
+"if(s.hbx_lt&&s.hbx_lt!='manual'){if((o.tagName&&s._TL(o.tagName)=='"
+"area')){if(!s._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"
+"id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s._IL(o.lpos))"
+"o.lpos=o.coords}else{if(s._IL(o.lid)<1)o.lid=s._LS(o.lid=o.text?o.t"
+"ext:o.innerText?o.innerText:'');if(!s._IL(o.lid)||s._II(s._TL(o.lid"
+"),'<img')>-1){h=''+o.innerHTML;bu=s._TL(h);i=s._II(bu,'<img');if(bu"
+"&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"
+";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l"
+"=s.linkName?s.linkName:s._hbxln(h);t=s.linkType?s.linkType.toLowerC"
+"ase():s.lt(h);oc=o.onclick?''+o.onclick:'';cv=s.pageName+'^^'+o.lid"
+"+'^^'+s.pageName+' | '+(o.lid=o.lid?o.lid:'no &lid')+'^^'+o.lpos;if"
+"(t&&(h||l)){cva=s.split(cv,'^^');vla=s.split(vl,',');for(x in vla)s"
+"._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if(!t&&oc.indexOf('.tl(')<"
+"0){s.c_w(c,cv,0);}else return ''");
s._IL=new Function("a","var s=this;return a!='undefined'?a.length:0");
s._II=new Function("a","b","c","var s=this;return a.indexOf(b,c?c:0)"
);
s._IS=new Function("a","b","c",""
+"var s=this;return b>s._IL(a)?'':a.substring(b,c!=null?c:s._IL(a))");
s._LN=new Function("a","b","c","d",""
+"var s=this;b=a.href;b+=a.name?a.name:'';c=s._LVP(b,'lid');d=s._LVP("
+"b,'lpos');r"
+"eturn[c,d]");
s._LVP=new Function("a","b","c","d","e",""
+"var s=this;c=s._II(a,'&'+b+'=');c=c<0?s._II(a,'?'+b+'='):c;if(c>-1)"
+"{d=s._II(a,'&',c+s._IL(b)+2);e=s._IS(a,c+s._IL(b)+2,d>-1?d:s._IL(a)"
+");return e}return ''");
s._LS=new Function("a",""
+"var s=this,b,c=100,d,e,f,g;b=(s._IL(a)>c)?escape(s._IS(a,0,c)):esca"
+"pe(a);b=s._LSP(b,'%0A','%20');b=s._LSP(b,'%0D','%20');b=s._LSP(b,'%"
+"09','%20');c=s._IP(b,'%20');d=s._NA();e=0;for(f=0;f<s._IL(c);f++){g"
+"=s._RP(c[f],'%20','');if(s._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"
+"rn unescape(b)");
s._LSP=new Function("a","b","c","d","var s=this;d=s._IP(a,b);return d"
+".join(c)");
s._IP=new Function("a","b","var s=this;return a.split(b)");
s._RP=new Function("a","b","c","d",""
+"var s=this;d=s._II(a,b);if(d>-1){a=s._RP(s._IS(a,0,d)+','+s._IS(a,d"
+"+s._IL(b),s._IL(a)),b,c)}return a");
s._TL=new Function("a","var s=this;return a.toLowerCase()");
s._NA=new Function("a","var s=this;return new Array(a?a:0)");
s._hbxm=new Function("m","var s=this;return (''+m).indexOf('{')<0");
s._hbxln=new Function("h","var s=this,n=s.linkNames;if(n)return s.pt("
+"n,',','lnf',h);return ''");
/* END setupLinkTrack */


/*
 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
 */
s.detectRIA=new Function("cn", "fp", "sp", "mfv", "msv", "sf", ""
+"cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-"
+"1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc',"
+"'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin"
+"g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u"
+"k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)"
+"{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['"
+"Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16"
+",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len"
+"gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript"
+"ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)"
+"{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}"
+"if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec"
+"Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri"
+"pt('on error resume next: result = IsObject(CreateObject(\"Shockwav"
+"eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'flas"
+"h not detected':fv==0?'flash enabled (no version)':'flash '+fv;}if("
+"!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'"
+"+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'"
+"+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'"
+"+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'"
+"+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('"
+"+'e){}}';eval(tc);sr=sv==''?'silverlight not detected':'silverlight"
+" '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;"
+"if(sr)s[sp]=sr;}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");




/*
 * Utility Function: p_c
 */
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
/*
 * Plugin: linkHandler 0.5 - identify and report custom links
 */
s.linkHandler=new Function("p","t",""
+"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
+"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
+"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
+"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
s.p_gn=new Function("t","h",""
+"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+"return 0;");
/*
 * Plugin: exitLinkHandlerQP 0.5 - identify and report exit links
 */
s.exitLinkHandlerQP=new Function("qp","p",""
+"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
+"e&&(h||s.linkName)))return '';t=s[n];s[n]=p?p:t;hqp=s.getQueryParam"
+"(qp,'|',h);h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt"
+"(h)=='e')s.linkType='e';else if(hqp&&s.lt(hqp)=='e'){s.linkType='e'"
+";h=hqp;}else h='';s[n]=t;return h;");
/*
 * Utility Function: p_gh
 */
s.p_gh=new Function(""
+"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime();e.setTime"
+"(ct+730*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}else return 'Repeat';");
/*
 * Plugin (H code): manageQueryParam 1.0 - swap parameters in query string 
 */
s.manageQueryParam=new Function("p","w","e","u",""
+"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length)}else{qp=qs.substring(1,qs.len"
+"gth);b=''}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1,x"
+");b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.subs"
+"tring(0,y);b=b.substring(y,b.length)}else{qp=b;b=''}}}if(e&&qp){y=q"
+"p.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';qv=s.epa(qv);"
+"qv=unescape(qv);qv=unescape(qv);i=qv.indexOf('|');if(i>-1){x=qv.sub"
+"string(0,i);qv=escape(x)+qv.substring(i)}qp=qp.substring(0,y+1)+qv;"
+"}if(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs"
+"='?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else "
+"qs='?'+qp;return u+qs");
/*
 * Function - read combined cookies v 0.2
 */
s.c_rr=s.c_r;
s.c_r=new Function("k",""
+"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
+"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
+"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
+",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
+"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
+"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
+"urn v;");
/*
 * Function - write combined cookies v 0.2
 */
s.c_wr=s.c_w;
s.c_w=new Function("k","v","e",""
+"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
+"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
+".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
+"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
+".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
+"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
+"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
+"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
+".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
+"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
+"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");

s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");

s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* Utility function p_fo */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Plugin: getActionDepth v1.0
*/

s.getActionDepth=new Function("c",""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
+ "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
+ "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
//s.debugTracking=true
//s.visitorNamespace="collegeboard"
s.trackingServer="track.collegeboard.org"
s.trackingServerSecure="strack.collegeboard.org"
//s.dc=112
/****************************** MODULES *****************************/
/* Module: Media Modified 1/23/15 */
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s.m_i("Media");

/* Kampyle to Omniture integration plug-in code */
var k_sc_param = {'instance' : s , 'evar' : 'eVar54'};
/* document.write('<script type="text/javascript" src="https://common.collegeboard.org/js/k_sitecatalyst.js"><'+'/script>'); */

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.tagContainerMarker='';s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingS"
+"erverSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net"
+"';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobi"
+"le?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+(s.tagContainerMarker?\"-\"+s.tagContainerMarker:\"\")+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv"
+">=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+"
+"'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;fo"
+"r(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=windo"
+"w,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s."
+"forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_"
+"top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'"
+"};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v)"
+"{var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLo"
+"werCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google'"
+")>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(',"
+"'+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf"
+",vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',"
+"')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk]"
+";if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(ty"
+"peof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else "
+"if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.subs"
+"tring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv="
+"','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[m"
+"n].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x"
+"=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q"
+"='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocatio"
+"nHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authState')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k"
+"=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=functi"
+"on(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFi"
+"lters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.inde"
+"xOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.ln"
+"k=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct."
+"href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForce"
+"dLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcEl"
+"ement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a"
+".parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent"
+"\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var"
+" x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n"
+"=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=t"
+"his,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.p"
+"rotocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagN"
+"ame;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t"
+"=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toL"
+"owerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if"
+"(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.inde"
+"xOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=funct"
+"ion(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s"
+".epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s"
+".sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]"
+"]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var "
+"s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf("
+"\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclic"
+"k',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTrackin"
+"g=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s"
+"_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m)"
+"{if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}retu"
+"rn 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m"
+";l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s"
+".un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl"
+"=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e'"
+",'_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m["
+"l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))r"
+"eturn;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).ind"
+"exOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s."
+"m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).i"
+"ndexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.l"
+"oadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}"
+"else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._i"
+"n+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250"
+";if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/"
+"javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,"
+"u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){v"
+"ar s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=fu"
+"nction(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i"
+"=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s"
+".maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.d"
+"lt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloud"
+"VisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID "
+"= false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck("
+");};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s."
+"audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWa"
+"itingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;"
+"s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisito"
+"rID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marke"
+"tingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnaly"
+"ticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalytics"
+"VisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;"
+"s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint ="
+" true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudience"
+"ManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarke"
+"tingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingF"
+"orAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceMa"
+"nagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToT"
+"rack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;i"
+"f (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWh"
+"enReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack())"
+" {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._call"
+"backWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrac"
+"k=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {}"
+";for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s"
+".callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexO"
+"f('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));"
+"if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),s"
+"ess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '"
+"+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && ("
+"s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.g"
+"l(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='"
+"',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.to"
+"Precision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';"
+"if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv"
+">=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.of"
+"fsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return h"
+"p');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30)"
+"{ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectio"
+"nType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);"
+"if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s"
+".eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}i"
+"f(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLea"
+"veQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else "
+"trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-"
+"object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx"
+";if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt"
+"(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s',"
+"'var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+"
+"(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m("
+"'t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.e"
+"o=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=t"
+"his;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagC"
+"ontainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];"
+"y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='functi"
+"on'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply"
+"(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagNa"
+"me){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('"
+"Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parse"
+"Float(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;"
+"if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDat"
+"aID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,"
+"ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteL"
+"ightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIn"
+"crementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n="
+"1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,re"
+"solution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trac"
+"kingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccoun"
+"tMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,light"
+"TrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=functi"
+"on(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/index.html'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()
