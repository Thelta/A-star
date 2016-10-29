Diagrams
--------------------------------------------------------------------------------

Diagrams can be inserted alongside, as in this      ****************************
example, or between paragraphs of text as shown     * .---------.              *
below.                                              * |  Server |<------.      *
                                                    * '----+----'       |      *
The diagram parser leaves symbols used as labels    *      |            |      *
unmodified, so characters like > and ( can appear   *      | DATA CYCLE |      *
inside of the diagram. In fact, any plain text      *      v            |      *
may appear in the diagram. In addition to labels,   *  .-------.   .----+----. *
any un-beautified text will remain in place for     * | Security|  |  File   | *
use as ASCII art. Thus, the diagram is rarely       * | Policy  +->| Manager | *
distored by the beautification process.             *  '-------'   '---------' *
                                                    ****************************

*************************************************************************************************
*.-------------------.                           ^                      .---.                   *
*|    A Box          |__.--.__    __.-->         |                      |   |                   *
*|                   |        '--'               v                      |   |                   *
*'-------------------'                                                  |   |                   *
*                       Round                                       *---(-. |                   *
*  .-----------------.  .-------.    .----------.         .-------.     | | |                   *
* |   Mixed Rounded  | |         |  / Diagonals  \        |   |   |     | | |                   *
* | & Square Corners |  '--. .--'  /              \       |---+---|     '-)-'       .--------.  *
* '--+------------+-'  .--. |     '-------+--------'      |   |   |       |        / Search /   *
*    |            |   |    | '---.        |               '-------'       |       '-+------'    *
*    |<---------->|   |    |      |       v                Interior                 |     ^     *
*    '           <---'      '----'   .-----------.              ---.     .---       v     |     *
* .------------------.  Diag line    | .-------. +---.              \   /           .     |     *
* |   if (a > b)     +---.      .--->| |       | |    | Curved line  \ /           / \    |     *
* |   obj->fcn()     |    \    /     | '-------' |<--'                +           /   \   |     *
* '------------------'     '--'      '--+--------'      .--. .--.     |  .-.     +Done?+-'      *
*    .---+-----.                        |   ^           |\ | | /|  .--+ |   |     \   /         *
*    |   |     | Join                   |   | Curved    | \| |/ | |    \    |      \ /          *
*    |   |     +---->  |                 '-'  Vertical  '--' '--'  '--  '--'        +  .---.    *
*    '---+-----'       |                                                            |  | 3 |    *
*                      v                             not:line    'quotes'        .-'   '---'    *
*                  .---+--------.            /            A || B   *bold*       |        ^      *
*                 |   Not a dot  |      <---+---<--    A dash--is not a line    v        |      *
*                  '---------+--'          /           Nor/is this.            ---              *
*************************************************************************************************
[Figure [diagram]: Diagrams can also have captions]


Code with line-like symbols is allowed in diagrams and is parsed correctly so
long as you make it unambiguous:

****************************************
*  .-------------------------+--+---.  *
*  |   --x;       x->y       |__|   |  *
*  |   0  __proto__  __FILE__   <=  |  *
*  |   __   a | b              -->  |  *
*  |  |__|  y--;   x || y  a + b    |  *
*  |__|__|__________________________|  *
****************************************

<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script> 
