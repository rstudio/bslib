# as_fill_item() with a simple tag

    Code
      cat(format(as_fill_item(tag_simple())))
    Output
      <div class="test html-fill-item" id="test"></div>

# as_fill_item() with a simple tag with arguments

    Code
      cat(format(ts_fill))
    Output
      <div class="test html-fill-item" id="test" style="min-height:100px;max-height:100%;"></div>

# as_fill_item() with a nested tag on outer tag

    Code
      cat(format(as_fill_item(tag_nested())))
    Output
      <div class="html-fill-item">
        <div class="inner"></div>
        <div class="nested">
          <div class="inner deep"></div>
        </div>
        <div class="inner"></div>
      </div>

# as_fill_item() with a nested tag on inner tag

    Code
      cat(format(nested_fill))
    Output
      <div>
        <div class="inner html-fill-item"></div>
        <div class="nested">
          <div class="inner deep html-fill-item"></div>
        </div>
        <div class="inner html-fill-item"></div>
      </div>

# as_fillable_container() with a simple tag

    Code
      cat(format(as_fillable_container(tag_simple())))
    Output
      <div class="test html-fill-container" id="test"></div>

# as_fillable_container() with a simple tag with arguments

    Code
      cat(format(ts_fillable))
    Output
      <div class="test html-fill-container" id="test" style="min-height:100px;max-height:100%;gap:1em;"></div>

# as_fillable_container() with a nested tag on outer tag

    Code
      cat(format(as_fillable_container(tag_nested())))
    Output
      <div class="html-fill-container">
        <div class="inner"></div>
        <div class="nested">
          <div class="inner deep"></div>
        </div>
        <div class="inner"></div>
      </div>

# as_fillable_container() with a nested tag on inner tag

    Code
      cat(format(nested_fillable))
    Output
      <div>
        <div class="inner html-fill-container"></div>
        <div class="nested">
          <div class="inner deep html-fill-container"></div>
        </div>
        <div class="inner html-fill-container"></div>
      </div>

# as_fill_carrier() with a simple tag

    Code
      cat(format(as_fill_carrier(tag_simple())))
    Output
      <div class="test html-fill-item html-fill-container" id="test"></div>

# as_fill_carrier() with a simple tag with arguments

    Code
      cat(format(ts_carrier))
    Output
      <div class="test html-fill-item html-fill-container" id="test" style="min-height:100px;max-height:100%;gap:1em;"></div>

# as_fill_carrier() with a nested tag on outer tag

    Code
      cat(format(as_fill_carrier(tag_nested())))
    Output
      <div class="html-fill-item html-fill-container">
        <div class="inner"></div>
        <div class="nested">
          <div class="inner deep"></div>
        </div>
        <div class="inner"></div>
      </div>

# as_fill_carrier() with a nested tag on inner tag

    Code
      cat(format(nested_carrier))
    Output
      <div>
        <div class="inner html-fill-item html-fill-container"></div>
        <div class="nested">
          <div class="inner deep html-fill-item html-fill-container"></div>
        </div>
        <div class="inner html-fill-item html-fill-container"></div>
      </div>

