<?php
$branchID = $this->session->userdata('BRANCHid');
$SCP = $this->db->query(
    "SELECT tbl_supplier_payment.*, tbl_supplier.* 
        FROM tbl_supplier_payment 
        LEFT JOIN tbl_supplier ON tbl_supplier.Supplier_SlNo = tbl_supplier_payment.SPayment_customerID 
        WHERE tbl_supplier_payment.SPayment_id = '$PamentID'
    ");
$CPROW = $SCP->row();
$CUSID = $CPROW->SPayment_customerID;
$paid = $CPROW->SPayment_amount;
$type = $CPROW->SPayment_TransactionType;


$Custid = $CPROW->SPayment_customerID;

$prevdueAmont = $CPROW->SPayment_previous_due;
$totalDue = $type == 'CP' ? $prevdueAmont - $CPROW->SPayment_amount : $prevdueAmont + $CPROW->SPayment_amount;

?>

<div class="content_scroll" style="width: 850px; ">
<a  id="printIcon" style="cursor:pointer"> <i class="fa fa-print" style="font-size:24px;color:green"></i> Print</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="<?php echo base_url();?>supplierPayment" title="" class="buttonAshiqe">Go Back</a>
    <div id="reportContent">
        <div class="row" style="margin-bottom: 20px;">
            <div class="col-xs-12">
                <h6 style="background:#ddd; text-align: center; font-size: 18px; font-weight: 900; padding: 5px; color: red !important;">Supplier Payment</h6>
            </div>
        </div>
        <div class="row" style="margin-bottom: 20px;">
            <div class="col-xs-6">
                <table style="width: 100%;">
                    <tr>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; ">Company Name :</td>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; "><?php echo $CPROW->Supplier_Name; ?></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; ">Customer Name :</td>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; "><?php echo $CPROW->contact_person; ?></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; ">Phone Number:</td>
                        <td colspan="2" style="font-size: 13px; font-weight: 600; "><?php echo $CPROW->Supplier_Mobile; ?></td>
                    </tr>
                </table>
            </div>
            <div class="col-xs-6">
                <table style="width: 100%;text-align:right;">
                    <tr>
                        <td style="font-size: 13px; font-weight: 600;width:70%"> TR. Id:</td>
                        <td style="font-size: 13px; font-weight: 600;"><?php echo $CPROW->SPayment_invoice; ?></td>
                    </tr>
                    <tr>
                        <td style="font-size: 13px; font-weight: 600; ">TR. Date:</td>
                        <td style="font-size: 13px; font-weight: 600; "><?php echo $CPROW->SPayment_date; ?> </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="row" style="margin-bottom: 20px;">
            <div class="col-xs-12">
                <table class="border" cellspacing="0" cellpadding="0" style="width: 100%;">
                    <thead>
                        <tr>
                            <th style="font-size: 14px; font-weight: 700;text-align:center;">Sl No</th>
                            <th style="font-size: 14px; font-weight: 700;text-align:center;">Description</th>
                            <th style="font-size: 14px; font-weight: 700;text-align:center;">Recieved</th>
                            <th style="font-size: 14px; font-weight: 700;text-align:center;">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td style="text-align: center;">01</td>
                        <td><?php echo $CPROW->SPayment_notes; ?></td>
                        <td style="text-align:right;"><?php if($type == 'CR'): echo number_format($CPROW->SPayment_amount, 2); else: echo '00.00'; endif; ?></td>
                        <td style="text-align:right;"><?php if($type == 'CP'): echo number_format($CPROW->SPayment_amount, 2); else: echo '00.00'; endif; ?></td>
                        </tr>
                        <tr>
                            <th colspan="2" style="font-size: 14px; font-weight: 700; text-align: right;">Total:</th>
                            <th style="font-size: 13px; font-weight: 700;text-align:right;"><?php if($type == 'CR'): echo number_format($CPROW->SPayment_amount, 2); else: echo '00.00'; endif; ?></th>
                            <th style="font-size: 13px; font-weight: 700;text-align:right;"><?php if($type == 'CP'): echo number_format($CPROW->SPayment_amount, 2); else: echo '00.00'; endif; ?></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row" style="margin-bottom: 20px;">
            <div class="col-xs-8">
                <h6 style=" font-size: 10px; font-weight: 600;">Paid (In Word): <?php echo convertNumberToWord($CPROW->SPayment_amount);?></h6>
            </div>
            <div class="col-xs-4 text-left;">
                <table style="width: 100%;float:right;">
                    <tr>
                        <td  style="font-size: 13px; font-weight: 600; ">Previous Due : </td>
                        <td  style="font-size: 13px; font-weight: 600; text-align: right; "> <?php echo number_format($prevdueAmont, 2); ?></td>
                    </tr>
                    <tr>
                        <td  style="font-size: 13px; font-weight: 600; border-bottom: 2px solid #000; ">Paid Amount : </td>
                        <td  style="font-size: 13px; font-weight: 600; border-bottom: 2px solid #000; text-align: right; "><?php echo number_format($CPROW->SPayment_amount, 2); ?></td>
                    </tr>
                    <tr>
                        <td style="font-size: 13px; font-weight: 600; ">Current Due : </td>
                        <td style="font-size: 13px; font-weight: 600; text-align: right; "><?php echo number_format($totalDue, 2); ?></td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="position:fixed;left:0;bottom:5px;width:100%;">
            <div class="row" style="font-size:12px;">
                <div class="col-xs-4" style="margin-bottom: 10px; margin-left: 30px;">
                    <div style="border-top: 1px solid #000; text-align: center;">
                        <strong>Received By</strong>
                    </div>
                </div>
                <div class="col-xs-4">
                </div>
                <div class="col-xs-4" style="float: right; margin-right: 30px;">
                    <div style="border-top: 1px solid #000; text-align: center;">
                        <strong>Chemitex Point</strong>
                    </div>
                </div>
                <div class="col-xs-12" style="text-align: center; border-top: 1px solid #ccc; padding-top:7px;">
                    Print Date: <?php echo Date("Y-m-d g:i:s A");?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php 

  function convertNumberToWord($num = false){
      $num = str_replace(array(',', ' '), '' , trim($num));
      if(! $num) {
          return false;
      }
      $num = (int) $num;
      $words = array();
      $list1 = array('', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
          'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
      );
      $list2 = array('', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred');
      $list3 = array('', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion',
          'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion',
          'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'
      );
      $num_length = strlen($num);
      $levels = (int) (($num_length + 2) / 3);
      $max_length = $levels * 3;
      $num = substr('00' . $num, -$max_length);
      $num_levels = str_split($num, 3);
      for ($i = 0; $i < count($num_levels); $i++) {
          $levels--;
          $hundreds = (int) ($num_levels[$i] / 100);
          $hundreds = ($hundreds ? ' ' . $list1[$hundreds] . ' hundred' . ( $hundreds == 1 ? '' : 's' ) . ' ' : '');
          $tens = (int) ($num_levels[$i] % 100);
          $singles = '';
          if ( $tens < 20 ) {
              $tens = ($tens ? ' ' . $list1[$tens] . ' ' : '' );
          } else {
              $tens = (int)($tens / 10);
              $tens = ' ' . $list2[$tens] . ' ';
              $singles = (int) ($num_levels[$i] % 10);
              $singles = ' ' . $list1[$singles] . ' ';
          }
          $words[] = $hundreds . $tens . $singles . ( ( $levels && ( int ) ( $num_levels[$i] ) ) ? ' ' . $list3[$levels] . ' ' : '' );
      } //end for loop
      $commas = count($words);
      if ($commas > 1) {
          $commas = $commas - 1;
      }
      $inword = implode(' ', $words) ."Taka Only";
    return strtoupper($inword);
  }
  
?>

<script>
    let printIcon = document.querySelector('#printIcon');
    printIcon.addEventListener('click', () => {
        event.preventDefault();
        print();
    })
    async function print(){
        let reportContent = `
            <div class="container">
                ${document.querySelector('#reportContent').innerHTML}
            </div>
        `;

        var reportWindow = window.open('', 'PRINT', `height=${screen.height}, width=${screen.width}`);
        reportWindow.document.write(`
            <?php $this->load->view('Administrator/reports/reportHeader.php');?>
        `);

        reportWindow.document.head.innerHTML += `<link href="<?php echo base_url()?>assets/css/prints.css" rel="stylesheet" />`;
        reportWindow.document.body.innerHTML += reportContent;

        reportWindow.focus();
        await new Promise(resolve => setTimeout(resolve, 1000));
        reportWindow.print();
        reportWindow.close();
    }
</script>