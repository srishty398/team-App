import { LightningElement,wire ,api } from 'lwc';
import getTeamMemberList from '@salesforce/apex/TeamAppController.getTeamMemberList';
import  getTeamList  from '@salesforce/apex/TeamAppController.getTeamList';

export default class TeamList extends LightningElement {
    @api teamMemberList=[];
    @api fullData=[];
    @api teamList=[];
    //error;
    // @wire(getTeamMemberList)
    // TeamMemberList({data,error}){
    //     if(data){
    //         this.teamMemberList=data;
    //         this.fullData=data;
    //     }
    //     if(error){
    //         this.error=error;
    //     }
    // }
    // @wire(getTeamList)
    // TeamList({data,error}){
    //     if(data){
    //         this.teamList=[];
    //         this.teamList.push( { label: 'None', value: 'None', selected: true });
    //         for (let key in data) {
    //             this.teamList.push( { label: data[key].Name__c, value: data[key].Id});
    //         }
    //     }
    //     if(error){
    //         this.error=error;
    //     }
    // }
    SearchTeamMember(){
        var selectedTeam = this.template.querySelector("lightning-combobox").value;
        console.log(selectedTeam);
        if(selectedTeam==='None'){
            this.teamMemberList=this.fullData;
        }
        else{
            this.teamMemberList=this.fullData.filter(Element=>Element.Team__c==selectedTeam);
        }
    }
}