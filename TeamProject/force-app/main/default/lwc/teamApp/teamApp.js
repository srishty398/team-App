import { LightningElement , track} from 'lwc';
import getTeamMemberList from '@salesforce/apex/TeamAppController.getTeamMemberList';
import  getTeamList  from '@salesforce/apex/TeamAppController.getTeamList';

export default class TeamApp extends LightningElement {

    @track teamList = [];
    @track teamMemberList=[];
    @track fullData=[];

    connectedCallback(){
        this.loadData();
    }


    handleReloadList(event){
        console.log('event catch 17');
        //eval("$A.get('e.force:refreshView').fire();");
        this.loadData();
    }

    loadData(){
        console.log('loadData');
        this.teamMemberList = [];
        this.fullData = [];

        getTeamMemberList().then(result=>{
            if(result){
                this.teamMemberList=result;
                this.fullData=result;
                console.log(' this.teamMemberList '+JSON.stringify( this.teamMemberList));
                console.log(' this.fullData '+JSON.stringify( this.fullData));


            }
        }).catch(error=>{
            this.handleError(error.body.fieldErrors.Name[0].message);
        })

        //

        getTeamList().then(result=>{
            if(result){
                this.teamList=[];
                this.teamList.push( { label: 'None', value: 'None', selected: true });
                for (let key in result) {
                    this.teamList.push( { label: result[key].Name__c, value: result[key].Id});
                }
            }
        }).catch(error=>{
            this.handleError(error.body.fieldErrors.Name[0].message);
        })
    }

    handleError(error) {
        const event = new ShowToastEvent({
            title: 'Error Occured!',
            message: error,
            variant: 'error'
        });
        this.dispatchEvent(event);
    }
}