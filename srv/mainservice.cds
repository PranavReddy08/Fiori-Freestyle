using po.ust from '../db/schema';

service mainService{

    entity vendor  as projection on ust.vendormaster;
    entity material as projection on ust.mastermaterial;
    entity POhead as projection on ust.poheader;
    entity POItem as projection on ust.poitem;
    entity GRHead as projection on ust.gr_header;
    entity GRItem as projection on ust.gr_item;
    entity InvHead as projection on ust.inv_header;
    entity InvItem as projection on ust.inv_item;
}
