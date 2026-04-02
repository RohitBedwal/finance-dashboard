import BulkUpload from 'assets/icons/bulk_upload_products.svg';
import Filter from 'assets/icons/filter.svg';
import PersonIcon from 'assets/icons/person_add.svg';
import VisibilityOnIcon from 'assets/icons/visibility_on.svg';

export const GET_ICON = (type) => ({
  bulk: BulkUpload,
  filter: Filter,
  'add-employee': PersonIcon,
  view: VisibilityOnIcon,
  visibility: VisibilityOnIcon,
})[type];
