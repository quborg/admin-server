import Args from './kinds/args';
import Entities from './kinds/entities';
import Inputs from './kinds/inputs';
import Queries from './kinds/queries';
import Mutations from './kinds/mutations';
import Scalars from './kinds/scalars';

const TypeDefs = [Scalars, Entities, Inputs, Args, Queries, Mutations];

export default TypeDefs;
