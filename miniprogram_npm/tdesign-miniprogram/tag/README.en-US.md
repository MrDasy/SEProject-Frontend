:: BASE_DOC ::

## API
### Tag Props

name | type | default | description | required
-- | -- | -- | -- | --
closable | Boolean | false | \- | N
custom-style | String | - | `0.25.0` | N
disabled | Boolean | false | \- | N
external-classes | Array | - | `['t-class']` | N
icon | String / Slot | - | \- | N
max-width | String / Number | - | \- | N
shape | String | square | options：square/round/mark | N
size | String | medium | options：small/medium/large。Typescript：`SizeEnum` | N
theme | String | default | options：default/primary/warning/danger/success | N
variant | String | dark | options：dark/light/outline/light-outline | N

### Tag Events

name | params | description
-- | -- | --
click | - | \-
close | - | \-

### CheckTag Props

name | type | default | description | required
-- | -- | -- | -- | --
checked | Boolean | undefined | \- | N
default-checked | Boolean | undefined | uncontrolled property | N
closable | Boolean | false | `deprecated` | N
content | String / Number / Slot | - | \- | N
custom-style | String | - | `0.25.0` | N
disabled | Boolean | false | \- | N
external-classes | Array | - | `['t-class']` | N
icon | String / Slot | - | \- | N
shape | String | square | `deprecated`。options：square/round/mark | N
size | String | medium | options：small/medium/large。Typescript：`SizeEnum` | N
variant | String | dark | `0.26.0`。options：dark/light/outline/light-outline | N

### CheckTag Events

name | params | description
-- | -- | --
change | `(checked: boolean)` | \-
click | - | \-
