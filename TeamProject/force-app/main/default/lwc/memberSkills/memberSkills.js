import { LightningElement,wire } from 'lwc';
import  getTeamList  from '@salesforce/apex/TeamAppController.getTeamList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import  addTeamMember  from '@salesforce/apex/TeamAppController.addTeamMember';

export default class MemberSkills extends LightningElement {
    teamList;
    error;
    teamMember;
    memberName = '';
    teamId = '';
    Skill = '';

    @wire(getTeamList)
    TeamList({data,error}){
        if(data){
            this.teamList=[];
            for (let key in data) {
                var item = {
                    "label": data[key].Name__c,
                    "value": data[key].Id
                };
                this.teamList.push(item);
            }
        }
        if(error){
            this.error=error;
        }
        console.log('cacheable'+JSON.stringify( this.teamList));
    }
    handleInput(event){
        if(event.target.name === 'skills'){
            this.Skill = event.detail.value;
        }else if(event.target.name === 'selectCountry'){
            this.teamId = event.detail.value;
        }else if(event.target.name === 'memberName'){
            this.memberName = event.detail.value;
        }
    }
    handleSubmitForm(){
        // var memberName = this.template.querySelector(".memberName").value;
        // var teamId = this.template.querySelector(".teamName").value; 
        // var Skill = this.template.querySelector(".skills").value;
        
        addTeamMember({ memberName:this.memberName, teamId:this.teamId, skills:this.Skill }).then(result=>{
            console.log('rr '+result);
            if(result){
                console.log('event fire');
                const selectedEvent = new CustomEvent('reloadlist', { detail: true });
                this.dispatchEvent(selectedEvent);

                const event = new ShowToastEvent({
                    title: 'Congratulations!!',
                    message: 'Memeber added Successfully',
                    variant: 'success'
                });
                this.dispatchEvent(event);
                this.Skill ='';
                this.teamId = '';
                this.memberName = '';

                

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