(function (){

    $(document).ready(function() {
      OpenPay.setId('mghu5rdshfetmetuepbv');
      OpenPay.setApiKey('pk_7308305754ca4979ad7c49aceb3b6041');

      //habilitar o desabilitar el modo sandbox
      var flag = true;
      OpenPay.setSandboxMode(flag)

      //determina el status del modo sandbox
      var test = OpenPay.getSandboxMode()
        console.log('Modo sanbox se encuentra :'+ test);
    });

})()
