<div id="productList">
    <div style="display:none;" v-bind:style="{display: products.length > 0 ? '' : 'none'}">
        <div class="row">
            <div class="col-md-12">
                <a href="" style="margin: 7px 0;display:block;width:50px;" v-on:click.prevent="print">
                    <i class="fa fa-print"></i> Print
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive" id="reportTable">
                <div class="row">
                    <div class="col-md-12" style="text-align:right;">
                        Total Entities: {{products.length}}
                    </div>
                </div>
                <datatable :columns="columns" :data="products" :filter-by="filter">
						<template scope="{ row }">
							<tr>
								<td>{{ row.Product_Code }}</td>
								<td>{{ row.Product_Name }}</td>
								<td>{{ row.ProductCategory_Name }}</td>
								<td>{{ row.Product_SellingPrice }}</td>
							</tr>
						</template>
					</datatable>
					<datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo base_url(); ?>assets/js/vue/vue.min.js"></script>
<script src="<?php echo base_url();?>assets/js/vue/vuejs-datatable.js"></script>
<script src="<?php echo base_url(); ?>assets/js/vue/axios.min.js"></script>

<script>
    new Vue({
        el: '#productList',
        data() {
            return {
                products: [],
                columns: [
                    { label: 'Product Id', field: 'Product_Code', align: 'center', filterable: false },
                    { label: 'Product Name', field: 'Product_Name', align: 'center' },
                    { label: 'Category', field: 'ProductCategory_Name', align: 'center' },
                    { label: 'Sales Price', field: 'Product_SellingPrice', align: 'center' }
                ],
                page: 1,
                per_page: 50,
                filter: ''
            }
        },
        created() {
            this.getProducts();
        },
        methods: {
            getProducts() {
                axios.get('/get_products').then(res => {
                    this.products = res.data;
                })
            },
            async print() {
                let reportContent = `
					<div class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <h4 style="text-align:center">Product List</h4 style="text-align:center">
                            </div>
                        </div>
					</div>
					<div class="container">
						<div class="row">
							<div class="col-xs-12">
								${document.querySelector('#reportTable').innerHTML}
							</div>
						</div>
					</div>
				`;

                var mywindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}`);
                mywindow.document.write(`
					<?php $this->load->view('Administrator/reports/reportHeader.php'); ?>
				`);
                
                mywindow.document.body.innerHTML += reportContent;

                mywindow.focus();
                await new Promise(resolve => setTimeout(resolve, 1000));
                mywindow.print();
                mywindow.close();
            }
        }
    })
</script>