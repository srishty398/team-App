/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 03-26-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class TeamAppController{
    @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeamList(){
        List<Team__c> teamList= [Select id,Name__c from Team__c];
        return teamList;
    }
    @AuraEnabled
    public static boolean addTeamMember(String memberName,id teamId,String skills){
        try{
            insert(new Team_Member__c(Name__c=memberName,Skills__c=skills,Team__c=teamId));
            return true;
        }
        catch(Exception e){
            System.debug(e);
            throw e;
        }
    }
    @AuraEnabled
    public static List<Team_Member__c> getTeamMemberList(){
        List<Team_Member__c> teamMemberList= [Select id,Name__c,Skills__c,Team__r.Name__c from Team_Member__c];
        System.debug(teamMemberList);
        return teamMemberList;
    }
}