const salesInvoice = Vue.component("sales-invoice", {
  template: `
        <div>
            <div class="row">
                <div class="col-xs-12">
                    <a href="" v-on:click.prevent="print"><i class="fa fa-print"></i> Print</a>
                </div>
            </div>
            
            <div id="invoiceContent">
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <div _h098asdh>
                            SALES INVOICE
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-7" style="width: 60%">
                        <table class="customer-table" style="margin: 0">
                            <tbody>
                                <tr>
                                    <td style="width:40%"><strong>Customer ID</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.Customer_Code }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Company Name</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.owner_name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Customer Name</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.Customer_Name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.Customer_Address }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Contact No</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.Customer_Mobile }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-xs-5 text-right" style="width: 40%">
                        <table style="float: right">
                            <tbody>
                                <tr>
                                    <td style="width:40%"><strong>Invoice No</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.SaleMaster_InvoiceNo }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sale Date</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.SaleMaster_SaleDate }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sale by</strong><td>
                                    <td><strong>:</strong><td>
                                    <td>{{ sales.AddBy }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div _d9283dsc></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <table _a584de>
                            <thead>
                                <tr>
                                    <td>Sl.</td>
                                    <td>Description</td>
                                    <td>Qnty</td>
                                    <td>Rate</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, sl) in cart">
                                    <td>{{ sl + 1 }}</td>
                                    <td style="text-align: left;">{{ product.Product_Name }}</td>
                                    <td>{{ product.SaleDetails_TotalQuantity }} {{ product.Unit_Name }}</td>
                                    <td>{{ product.SaleDetails_Rate }}</td>
                                    <td align="right">{{ product.SaleDetails_TotalAmount }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-8">
                        <br>
                        <table class="pull-left">
                            <tr>
                                <td><strong>Previous Due</strong></td>
                                <td><strong>:</strong></td>
                                
                                <td style="text-align:right;width:45%;">{{ sales.SaleMaster_Previous_Due == null ? '0.00' : sales.SaleMaster_Previous_Due  }}</td>
                            </tr>
                            <tr>
                                <td><strong>Current Due</strong></td>
                                <td><strong>:</strong></td>
                                
                                <td style="text-align:right">{{ sales.SaleMaster_DueAmount == null ? '0.00' : sales.SaleMaster_DueAmount  }}</td>
                            </tr>
                            <tr>
                                <td colspan="3" style="border-bottom: 1px solid #000;"></td>
                            </tr>
                            <tr>
                                <td><strong>Total Due</strong></td>
                                <td><strong>:</strong></td>
                                
                                <td style="text-align:right;color:red !important;font-size: 13px;">{{ (parseFloat(sales.SaleMaster_Previous_Due) + parseFloat(sales.SaleMaster_DueAmount == null ? 0.00 : sales.SaleMaster_DueAmount)).toFixed(2) }}</td>
                            </tr>
                        </table> 
                        <table style="clear:both; float:left;margin-top:15px;">
                            <tr>
                                <th>In Word: </th>
                                <td style="padding-left: 10px;"> {{ convertNumberToWords(sales.SaleMaster_TotalSaleAmount) }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-xs-4">
                        <table _t92sadbc2>
                            <tr>
                                <td><strong>Sub Total</strong></td>
                                <td><strong>:</strong></td>
                                <td style="text-align:right">{{ sales.SaleMaster_SubTotalAmount }}</td>
                            </tr>
                            <tr>
                                <td><strong>Transport Cost</strong></td>
                                <td><strong>:</strong></td>
                                <td style="text-align:right">{{ sales.SaleMaster_Freight }}</td>
                            </tr>
                            <tr>
                            
                                <td colspan="3"><p style="border-bottom: 1px solid #000;margin: 0 "></p></td>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>:</strong></td>
                                <td style="text-align:right">{{ sales.SaleMaster_TotalSaleAmount }}</td>
                            </tr>
                            <tr>
                                <td><strong>Paid</strong></td>
                                <td><strong>:</strong></td>
                                <td style="text-align:right;color:green !important;">{{ sales.SaleMaster_PaidAmount }}</td>
                            </tr>
                            <tr>
                                <td colspan="3"><p style="border-bottom: 1px solid #000; margin: 0;"></p></td>
                            </tr>
                            <tr>
                                <td><strong>Due</strong></td>
                                <td><strong>:</strong></td>
                                <td style="text-align:right;color:red !important;">{{ sales.SaleMaster_DueAmount }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,
  props: ["sales_id"],
  data() {
    return {
      sales: {
        SaleMaster_InvoiceNo: null,
        SalseCustomer_IDNo: null,
        SaleMaster_SaleDate: null,
        Customer_Name: null,
        Customer_Address: null,
        Customer_Mobile: null,
        SaleMaster_TotalSaleAmount: null,
        SaleMaster_TotalDiscountAmount: null,
        SaleMaster_TaxAmount: null,
        SaleMaster_Freight: null,
        SaleMaster_SubTotalAmount: null,
        SaleMaster_PaidAmount: null,
        SaleMaster_DueAmount: null,
        SaleMaster_Previous_Due: null,
        SaleMaster_Description: null,
        AddBy: null,
      },
      cart: [],
      style: null,
      companyProfile: null,
      currentBranch: null,
    };
  },
  filters: {
    formatDateTime(dt, format) {
      return dt == "" || dt == null ? "" : moment(dt).format(format);
    },
  },
  created() {
    this.setStyle();
    this.getSales();
    this.getCurrentBranch();
  },
  methods: {
    getSales() {
      axios.post("/get_sales", { salesId: this.sales_id }).then((res) => {
        this.sales = res.data.sales[0];
        this.cart = res.data.saleDetails;
      });
    },
    getCurrentBranch() {
      axios.get("/get_current_branch").then((res) => {
        this.currentBranch = res.data;
      });
    },
    setStyle() {
      this.style = document.createElement("style");
      this.style.innerHTML = `
                div[_h098asdh]{
                    background-color:#e0e0e0 !important;
                    font-weight: bold;
                    font-size:15px;
                    margin-bottom:10px;
                    border-bottom: 1px dotted #454545;
                }
                div[_d9283dsc]{
                    /*padding-bottom:25px;*/
                    /*border-bottom: 1px solid #ccc;*/
                    margin-bottom: 5px;
                }
                table[_a584de]{
                    width: 100%;
                    text-align:center;
                }
                table[_a584de] thead{
                    font-weight:bold;
                }
                table[_a584de] td{
                    padding: 3px;
                    border: 1px solid #000;
                }
                table[_t92sadbc2]{
                    width: 100%;
                }
                table[_t92sadbc2] td{
                    padding: 2px;
                }

                .customer-table td{
                    vertical-align: top;
                }
            `;
      document.head.appendChild(this.style);
    },
    convertNumberToWords(amountToWord) {
      var words = new Array();
      words[0] = "";
      words[1] = "One";
      words[2] = "Two";
      words[3] = "Three";
      words[4] = "Four";
      words[5] = "Five";
      words[6] = "Six";
      words[7] = "Seven";
      words[8] = "Eight";
      words[9] = "Nine";
      words[10] = "Ten";
      words[11] = "Eleven";
      words[12] = "Twelve";
      words[13] = "Thirteen";
      words[14] = "Fourteen";
      words[15] = "Fifteen";
      words[16] = "Sixteen";
      words[17] = "Seventeen";
      words[18] = "Eighteen";
      words[19] = "Nineteen";
      words[20] = "Twenty";
      words[30] = "Thirty";
      words[40] = "Forty";
      words[50] = "Fifty";
      words[60] = "Sixty";
      words[70] = "Seventy";
      words[80] = "Eighty";
      words[90] = "Ninety";
      amount = amountToWord == null ? "0.00" : amountToWord.toString();
      var atemp = amount.split(".");
      var number = atemp[0].split(",").join("");
      var n_length = number.length;
      var words_string = "";
      if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            if (n_array[i] == 1) {
              n_array[j] = 10 + parseInt(n_array[j]);
              n_array[i] = 0;
            }
          }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            value = n_array[i] * 10;
          } else {
            value = n_array[i];
          }
          if (value != 0) {
            words_string += words[value] + " ";
          }
          if (
            (i == 1 && value != 0) ||
            (i == 0 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Crores ";
          }
          if (
            (i == 3 && value != 0) ||
            (i == 2 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Lakhs ";
          }
          if (
            (i == 5 && value != 0) ||
            (i == 4 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Thousand ";
          }
          if (
            i == 6 &&
            value != 0 &&
            n_array[i + 1] != 0 &&
            n_array[i + 2] != 0
          ) {
            words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
            words_string += "Hundred ";
          }
        }
        words_string = words_string.split("  ").join(" ");
      }
      return words_string + " only";
    },
    async print() {
      let invoiceContent = document.querySelector("#invoiceContent").innerHTML;
      let printWindow = window.open(
        "",
        "PRINT",
        `width=${screen.width}, height=${screen.height}, left=0, top=0`
      );
      if (this.currentBranch.print_type == "3") {
        printWindow.document.write(`
                    <html>
                        <head>
                            <title>Invoice</title>
                            <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                            <style>
                                body, table{
                                    font-size:11px;
                                }
                            </style>
                        </head>
                        <body>
                            <div style="text-align:center;">
                                <img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:80px;margin:0px;" /><br>
                                <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                <p style="white-space:pre-line;">${this.currentBranch.Repot_Heading}</p>
                            </div>
                            ${invoiceContent}
                        </body>
                    </html>
                `);
      } else if (this.currentBranch.print_type == "2") {
        printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Invoice</title>
                        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                        <style>
                            html, body{
                                width:500px;
                                font-size: 13px;
                                margin:0 5px;
                                padding:0;
                                position:relative;
                            }
                            .table{
                                width:500px;
                                height:100%;
                            }
                            .table>tbody>tr>td, .table>tfoot>tr>td{
                                border-top:0 !important;
                            }
                            .divHeader{
                                position: fixed;
                                top: 0;
                                width: 500px;
                            }
                            .divFooter{
                                width:500px;
                                position:fixed;
                                bottom:0;
                            }
                            @media print{
                                html, body{
                                    padding:3px;
                                }
                                .table{
                                    width:100% !important;
                                    height:100% !important;
                                }
                            }

                        </style>
                    </head>
                    <body>
                        <div class="containter">
                            <div class="divHeader">
                                <div class="col-xs-12">
                                    <div class="row">
                                        <div class="col-xs-3">
                                            <img src="/uploads/company_profile_thum/${this.currentBranch.Company_Logo_org}" alt="Logo" style="height:100px;" />
                                        </div>
                                        <div class="col-xs-9">
                                            <strong style="font-size:18px;">${this.currentBranch.Company_Name}</strong><br>
                                            <p style="white-space:pre-line;">${
                                                this.currentBranch
                                                .Repot_Heading
                                            }</p>
                                        </div>
                                        <div class="col-xs-12">
                                            <div style="border-bottom: 5px solid #454545;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td style="height:120px;padding-bottom:0;">

                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding-top:0;">${invoiceContent} </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style="height: 80px !important;">
                                            
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div class="col-xs-12 divFooter">
                                <div class="row" style="margin-bottom:5px;padding-bottom:6px;">
                                    <div class="col-xs-6" style="padding-left:0;">
                                        <span style="border-top: 1px solid #000; padding: 0px 25px;">Received by</span>
                                    </div>
                                    <div class="col-xs-6 text-right" style="padding:0 18px;">
                                        <span style="border-top: 1px solid #000; padding: 0px 25px;">Chemitex Point</span>
                                    </div>
    
                                    <div class="col-xs-12" style="font-size:12px; text-align:center;">
                                        Print Date: ${moment().format(
                                        "DD-MM-YYYY h:mm a"
                                        )}
                                    </div>
                                </div>                                            
                            </div> 
                        </div>                   
                    </body>
                    </html>
				`);
      } else {
        printWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Invoice</title>
                        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
                        <style>
                            body, table{
                                font-size: 11px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <table style="width:100%;">
                                <thead>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col-xs-2"><img src="/uploads/company_profile_thum/${
                                                  this.currentBranch
                                                    .Company_Logo_org
                                                }" alt="Logo" style="height:80px;" /></div>
                                                <div class="col-xs-10" style="padding-top:20px;">
                                                    <strong style="font-size:18px;">${
                                                      this.currentBranch
                                                        .Company_Name
                                                    }</strong><br>
                                                    <p style="white-space:pre-line;">${
                                                      this.currentBranch
                                                        .Repot_Heading
                                                    }</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div style="border-bottom: 5px solid #454545;margin-top:7px;margin-bottom:7px;"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    ${invoiceContent}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <div style="width:100%;height:50px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div style="position:fixed;left:0;bottom:15px;width:100%;">
                                <div class="row" style="border-bottom:1px solid #ccc;margin-bottom:5px;padding-bottom:6px;">
                                    <div class="col-xs-6">
                                        <span style="border-top: 1px solid #000; padding: 0px 25px;">Received by</span>
                                    </div>
                                    <div class="col-xs-6 text-right">
                                        <span style="border-top: 1px solid #000; padding: 0px 25px;">Chemitex Point</span>
                                    </div>
                                </div>
                                <div class="row" style="font-size:12px;">
                                    <div class="col-xs-12 text-center">
                                        Print Date: ${moment().format(
                                          "DD-MM-YYYY h:mm a"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </body>
                    </html>
				`);
      }
      let invoiceStyle = printWindow.document.createElement("style");
      invoiceStyle.innerHTML = this.style.innerHTML;
      printWindow.document.head.appendChild(invoiceStyle);
      printWindow.moveTo(0, 0);

      printWindow.focus();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      printWindow.print();
      printWindow.close();
    },
  },
});
