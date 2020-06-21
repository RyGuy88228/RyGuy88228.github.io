        function updateHealth() {
          document.getElementById("ehealth").value = calcHealth();
        }
        function updateDmg() {
          document.getElementById("reduct").value = calcReduct();
        }
        function calcReduct() {
          //(1-armor reduction)*(1-enchantment reduction)=(1-total reduction)
          //total reduction + (1-armor reduction)*(1-enchantment reduction) = 1;
          //total reduction = 1 - (1-armor reduction)*(1-enchantment reduction)
          if(getEPFPts() == 0) {
            return ((1-(1 - getTotalPoints()) + getResistanceReduction())*100).toFixed(2) + "%";
          }else {
            var minValue = (1 - (1-getTotalPoints())*(1-getMinEPF()) + getResistanceReduction())*100;
            var maxValue = (1 - (1-getTotalPoints())*(1-getMaxEPF()) + getResistanceReduction())*100;
            return minValue.toFixed(2) + "% - " + maxValue.toFixed(2) + "%";
          }
        }
        function calcHealth() {
          //health = (20 + 8 * amount of steak) / (1 - damage reduction)
          var extraHealth = 0;
          extraHealth += getInt("steak")*8;
          console.log("Steak HP: " + getInt("steak")*8);
          extraHealth += getInt("pots")*getPotVal(getInt("potlevel"));
          console.log("Pot Health: " + getInt("pots")*getPotVal(getInt("potlevel")));
          console.log("Ex Health: " + extraHealth)
          if(calcReduct().includes("-")) {
             let obj = calcReduct().substring(0, calcReduct().length - 1).split("% - ");
            console.log("obj0: " + obj[0]);
            console.log("obj1: " + obj[1]);
             var min = (20 + extraHealth) / (1 - obj[0]/100);
            console.log("Min: " + min);
             var max = (20 + extraHealth) / (1 - obj[1]/100);
            console.log("Max: " + max);
             return min.toFixed(2) + " - " + max.toFixed(2);
          }else {
            console.log("EX: " + extraHealth);
            return ((20 + extraHealth) / (1 - parseInt(calcReduct())/100)).toFixed(2);
          }
        }
        //Effective Health Stuff
        function getPotVal(strength) {
          switch(strength) {
            case 1:
              return 4;
              break;
            case 2:
              return 7;
              break;
            case 3:
              return 16;
              break;
            default:
              return 0;
          }
        }
        //Damage reduction stuff
        function getEPFPts() {
          var helmProt = getInt("helmprot");
          var chestProt = getInt("chestprot");
          var legProt = getInt("legprot");
          var bootProt = getInt("bootprot");
          var totalProt = helmProt + chestProt + legProt + bootProt;
          if(totalProt > 25) totalProt = 25;
          return totalProt;
        }
        function getMaxEPF() {
          var result = getEPFPts();
          if(result > 20) result = 20;
          return Math.ceil(result)*0.04;
        }
        function getMinEPF() {
          var result = getEPFPts() * .5;
          if(result > 20) result = 20;
          return Math.ceil(result)*0.04;
        }
        function getResistanceReduction() {
          return getInt("resistance")*0.2;
        }
        function getTotalPoints() {
          let points = 0;
          
          var helmItem = document.getElementById("helm");
          var helm = helmItem.options[helmItem.selectedIndex].value.toLowerCase();
          points += getPoints("helmet", helm);
          
          var legItem = document.getElementById("legs");
          var legs = legItem.options[legItem.selectedIndex].value.toLowerCase();
          points += getPoints("leggings", legs);
          
          var chestItem = document.getElementById("chest");
          var chest = chestItem.options[chestItem.selectedIndex].value.toLowerCase();
          points += getPoints("chestplate", chest);
          
          var bootItem = document.getElementById("boots");
          var boots = bootItem.options[bootItem.selectedIndex].value.toLowerCase();
          points += getPoints("boots", boots);
          
          return points*0.04;
        }
        function getPoints(piece, type) {
          if(type.toLowerCase() == "none") return 0;
          switch(piece) {
            case "boots":
              switch(type) {
                case "leather":
                  return 1;
                  break;
                case "chain":
                  return 1;
                  break;
                case "gold":
                  return 1;
                  break;
                case "iron":
                  return 2;
                  break;
                case "diamond":
                  return 3;
                  break;
                default:
                  return 0;
              }
              break;
            case "leggings":
              switch(type) {
                case "leather":
                  return 2;
                  break;
                case "chain":
                  return 4;
                  break;
                case "gold":
                  return 3;
                  break;
                case "iron":
                  return 5;
                  break;
                case "diamond":
                  return 6;
                  break;
                default:
                  return 0;
              }
              break;
            case "chestplate":
              switch(type) {
                case "leather":
                  return 3;
                  break;
                case "chain":
                  return 5;
                  break;
                case "gold":
                  return 5;
                  break;
                case "iron":
                  return 6;
                  break;
                case "diamond":
                  return 8;
                  break;
                default:
                  return 0;
              }
              break;
            case "helmet":
              switch(type) {
                case "leather":
                  return 1;
                  break;
                case "chain":
                  return 2;
                  break;
                case "gold":
                  return 2;
                  break;
                case "iron":
                  return 2;
                  break;
                case "diamond":
                  return 3;
                  break;
                default:
                  return 0;
              }
              break;
            default:
              return 0;
          }
        }
        function getInt(id) {
          if(document.getElementById(id).value == null) {
            return 0;
          }else {
            return parseInt(document.getElementById(id).value);
          }
        }
