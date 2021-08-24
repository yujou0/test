// Dialog tmpl
export default ( `<script id="tmpl-edit-form-dialog" type="text/template">
<div id="edit-form-dialog">
  <form>
    <div class="form-group">
      <label for="cname">English Name:</label>
      <input type="text" class="form-control" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="cname">Email:</label>
      <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="cname">Phone:</label>
      <input type="text" class="form-control" id="phone" name="phone" required>
    </div>
    <div class="form-group">
      <input type="hidden" id="uid" name="id" value="">
    </div>
  </form>
</div>
</script>`);