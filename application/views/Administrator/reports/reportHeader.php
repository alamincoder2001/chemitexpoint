<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Report</title>
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css">
    <style>
        body{
            padding: 20px!important;
        }
        body, table{
            font-size: 13px;
        }
        table th{
            text-align: center;
        }
    </style>
</head>
<body>
    <?php 
        $branchId       = $this->session->userdata('BRANCHid');
        $companyInfo    = $this->Billing_model->company_branch_profile($branchId);
    ?>
    <div class="container">
        <div class="row">
            <div class="col-xs-3" style="padding-right: 0"><img src="<?php echo base_url();?>uploads/company_profile_thum/<?php echo $companyInfo->Company_Logo_org; ?>" alt="Logo" style="height:100px;" /></div>
            <div class="col-xs-9" style="padding-left:0;">
                <strong style="font-size:18px;"><?php echo $companyInfo->Company_Name; ?></strong><br>
                <p style="white-space: pre-line;"><?php echo $companyInfo->Repot_Heading; ?></p>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div style="border-bottom: 5px solid #454545;"></div>
            </div>
        </div>
    </div>
</body>
</html>