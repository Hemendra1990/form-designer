
## How to use Cell template   
 


    
    <b style="color: red"> Hemendra</b>


    if(row.id === 3810) {
     return "<h1> Hello World </h1>"
    } else {
     return "<h2 style='color:red'> ${row.id}</h2>"
    }

### Using Font Awsome Icons in cell template
    
    if(row.gender === 'male')
        return "<h4 style='color:red'><i class='fa fa-male'></i></h4>";
    else
        return "<h4 style='color:green'><i class='fa fa-female'></i></h4>";    
