export const Header = () => (
  <div className="navbar bg-base-300 rounded-box w-full">
    <div className="flex-1 px-2 lg:flex-none">
      <button className="text-lg font-bold">daisyUI</button>
    </div>
    <div className="flex justify-end flex-1 px-2">
      <div className="flex items-stretch">
        <button className="btn btn-ghost rounded-btn">Button</button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost rounded-btn">
            Dropdown
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Item 2</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
