

    <div class="arrow-content">
      <div class="form1">
        <form method="post">
          <button type="submit" name="button" class="up" value="up"></button>
          <div class="current-month"><label class="month" style="color:black"><%=currentMonth%></label></div>         
          <button type="submit" name="button" class="down" value="down"></button>
        </form>
      </div> 
      <div class="form2">
        <% if (user.userType=="staff") { %>
          <div class="edit-btn">
            <a href="/edit">
                <div><b>Edit</b></div>
                <div class="edit"></div>
            </a>
          </div>
        <% } %>
      </div>
    </div>

    <% const e = JSON.parse(events) %>
    <% currentDays.forEach((week)=>{ %>
      <% week.forEach((day)=>{ %>
        <% if(day!=0){ %> 
          <% const arr = e.filter(obj=>{%>
            <% if(obj['date']!=day){%>
              <% return false;%>
            <% }else if(obj['month']==currentMonth){%>
              <% return false;%>
            <% }else if(obj['year']!=currentYear){%>
              <% return false; %>
            <% } %>
            <% return true;%>
          <% })%>
          <% if (arr.length>0){ %>
            <div id="popup-<%=currentYear%>-<%= monthNo %>-<%= day %>" class="popup">
              <div class="popup-content">
                <span class="close" onclick="closePopup('popup-<%=currentYear%>-<%= monthNo %>-<%= day %>')">&times;</span>
                <h2>Event Details</h2>
                <form method="post">
                  <label for="date">Date: <%= day %>-<%= monthNo %>-<%=currentYear%></label>
                  <% arr.forEach(ele=>{ %>
                    <hr>
                    <div class="event-type">
                      <label>Event Type : <%= ele.eventType %></label><br>
                    </div>
                    <table>
                      <tr>
                        <th>Event : <%= ele.eventTitle.replace(/#/g,"'").replace(/~/g,'"') %></th>
                      </tr>
                      <tr>
                        <th>Description : <%= ele.eventDescription.replace(/#/g,"'").replace(/~/g,'"') %></th>
                      </tr>
                      <tr>
                        <th>By Faculty : <%= ele.faculty_name %></th>
                      </tr>
                    </table>
                    <% if(user.userType=="staff" && ele.faculty_email==user.email) {%>
                    <button type="submit" class= "submit-btn" name="delete" value="<%=ele._id%>"> Delete </button>
                    <%}%>
                  <% }) %>
                </form>
              </div>
            </div>
          <% } %>
        <% } %>
      <% }) %>
    <% }) %>
    


   