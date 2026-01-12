const NotificationTemplateRepo = require("../Repository/notification.template.repo");
const CurdService = require("./curd.service")

class NotificationTemplateService extends CurdService {
  constructor(){
    super(NotificationTemplateRepo)
  }
  
} 



const notificationTemplateService = new NotificationTemplateService();
module.exports = notificationTemplateService; 