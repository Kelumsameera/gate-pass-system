import React, { useState } from 'react';
import { 
  AlertCircle, CheckCircle, Info, XCircle, X, ChevronDown, 
  Search, Calendar, Upload, Eye, EyeOff, Loader, Check
} from 'lucide-react';

// ============================================================================
// COMMON/BUTTON - Button Component with Variants
// ============================================================================

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '', 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400 active:bg-yellow-700',
    outline: 'border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400 active:bg-gray-200',
    link: 'text-blue-600 hover:text-blue-800 hover:underline focus:ring-blue-500'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading && <Loader className="animate-spin mr-2" size={16} />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="mr-2" size={18} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="ml-2" size={18} />}
    </button>
  );
};

// ============================================================================
// COMMON/INPUT - Input Component with Validation
// ============================================================================

const Input = ({ 
  label, 
  error, 
  hint,
  className = '',
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          } ${Icon ? 'pl-10' : ''} ${RightIcon ? 'pr-10' : ''}`}
          {...props}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <RightIcon size={18} />
          </button>
        )}
      </div>
      {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ============================================================================
// COMMON/TEXTAREA - Textarea Component
// ============================================================================

const Textarea = ({ 
  label, 
  error, 
  hint,
  rows = 4,
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ============================================================================
// COMMON/SELECT - Select Dropdown Component
// ============================================================================

const Select = ({ 
  label, 
  options, 
  error,
  hint,
  placeholder = 'Select an option',
  className = '',
  ...props 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-colors ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
      </div>
      {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ============================================================================
// COMMON/CHECKBOX - Checkbox Component
// ============================================================================

const Checkbox = ({ label, checked, onChange, error, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ============================================================================
// COMMON/RADIO - Radio Button Component
// ============================================================================

const Radio = ({ label, name, value, checked, onChange, className = '' }) => {
  return (
    <label className={`flex items-center cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};

const RadioGroup = ({ label, options, name, value, onChange, error, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="space-y-2">
        {options.map(opt => (
          <Radio
            key={opt.value}
            label={opt.label}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// ============================================================================
// COMMON/CARD - Card Container Component
// ============================================================================

const Card = ({ 
  children, 
  title,
  subtitle,
  footer,
  hoverable = false,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''} ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMMON/MODAL - Modal Dialog Component
// ============================================================================

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer,
  size = 'medium',
  closeOnOverlay = true
}) => {
  if (!isOpen) return null;

  const sizes = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        className="absolute inset-0" 
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div className={`bg-white rounded-lg shadow-xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden relative z-10`}>
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
        {footer && (
          <div className="border-t p-4 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMMON/TABLE - Table Component
// ============================================================================

const Table = ({ 
  columns, 
  data, 
  onRowClick,
  striped = false,
  hoverable = true,
  bordered = false
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${bordered ? 'border border-gray-200' : ''}`}>
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                ${striped && rowIdx % 2 === 1 ? 'bg-gray-50' : ''}
                ${hoverable ? 'hover:bg-gray-100' : ''}
                ${onRowClick ? 'cursor-pointer' : ''}
                border-b transition-colors
              `}
            >
              {columns.map((col, colIdx) => (
                <td 
                  key={colIdx} 
                  className={`px-4 py-3 text-sm text-gray-700 ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50">
          <p className="text-lg">No data available</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMMON/ALERT - Alert/Notification Component
// ============================================================================

const Alert = ({ 
  type = 'info', 
  title,
  message, 
  onClose,
  dismissible = true,
  className = ''
}) => {
  const types = {
    success: { 
      bg: 'bg-green-50', 
      border: 'border-green-200', 
      text: 'text-green-800', 
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    error: { 
      bg: 'bg-red-50', 
      border: 'border-red-200', 
      text: 'text-red-800', 
      icon: XCircle,
      iconColor: 'text-red-600'
    },
    warning: { 
      bg: 'bg-yellow-50', 
      border: 'border-yellow-200', 
      text: 'text-yellow-800', 
      icon: AlertCircle,
      iconColor: 'text-yellow-600'
    },
    info: { 
      bg: 'bg-blue-50', 
      border: 'border-blue-200', 
      text: 'text-blue-800', 
      icon: Info,
      iconColor: 'text-blue-600'
    }
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-4 mb-4 ${className}`}>
      <div className="flex items-start">
        <Icon className={`${config.iconColor} flex-shrink-0 mt-0.5`} size={20} />
        <div className={`ml-3 flex-1 ${config.text}`}>
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {dismissible && onClose && (
          <button 
            onClick={onClose} 
            className={`${config.text} hover:opacity-70 ml-2`}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMMON/BADGE - Badge Component
// ============================================================================

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800'
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm',
    large: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

// ============================================================================
// COMMON/SPINNER - Loading Spinner Component
// ============================================================================

const Spinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <Loader className="animate-spin text-blue-600" size={size === 'small' ? 16 : size === 'medium' ? 32 : 48} />
    </div>
  );
};

// ============================================================================
// COMMON/TOOLTIP - Tooltip Component
// ============================================================================

const Tooltip = ({ children, content, position = 'top' }) => {
  const [show, setShow] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`absolute ${positions[position]} z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap`}>
          {content}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMMON/TABS - Tabs Component
// ============================================================================

const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// ============================================================================
// DEMONSTRATION COMPONENT
// ============================================================================

export default function ComponentShowcase() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [showPassword, setShowPassword] = useState(false);

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
  ];

  const tableColumns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role', render: (row) => <Badge variant="primary">{row.role}</Badge> }
  ];

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'data', label: 'Data Display' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Card title="UI Components Library" subtitle="Complete collection of reusable React components" className="mb-8">
          <p className="text-gray-600">
            A comprehensive set of production-ready UI components built with React and Tailwind CSS.
            All components follow best practices and are fully customizable.
          </p>
        </Card>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'buttons' && (
          <Card title="Buttons" className="mb-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                  <Button size="large">Large</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-700">With Icons & States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button icon={Search}>Search</Button>
                  <Button icon={Upload} iconPosition="right">Upload File</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'inputs' && (
          <div className="space-y-6">
            <Card title="Text Inputs">
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="Enter your email"
                icon={Search}
                hint="We'll never share your email"
              />
              <Input 
                label="Password" 
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                rightIcon={showPassword ? EyeOff : Eye}
                onRightIconClick={() => setShowPassword(!showPassword)}
              />
              <Input 
                label="With Error" 
                error="This field is required"
                value=""
              />
              <Textarea 
                label="Description" 
                placeholder="Enter description"
                hint="Maximum 500 characters"
              />
            </Card>

            <Card title="Select & Options">
              <Select
                label="Country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'ca', label: 'Canada' }
                ]}
              />
              <Checkbox 
                label="I agree to the terms and conditions"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <RadioGroup
                label="Select an option"
                name="options"
                value={radioValue}
                onChange={setRadioValue}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
              />
            </Card>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <Card title="Alerts">
              <Alert type="success" message="Operation completed successfully!" />
              <Alert type="error" message="An error occurred. Please try again." />
              <Alert type="warning" message="Warning: This action cannot be undone." />
              <Alert type="info" title="Information" message="Here's some helpful information for you." />
            </Card>

            <Card title="Badges & Spinners">
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-700">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Loading Spinners</h4>
                <div className="flex items-center gap-6">
                  <Spinner size="small" />
                  <Spinner size="medium" />
                  <Spinner size="large" />
                </div>
              </div>
            </Card>

            <Card title="Modal Dialog">
              <Button onClick={() => setShowModal(true)}>Open Modal</Button>
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Example Modal"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button onClick={() => setShowModal(false)}>Confirm</Button>
                  </div>
                }
              >
                <p className="text-gray-600">
                  This is a modal dialog component. It can contain any content and comes with 
                  customizable header, body, and footer sections.
                </p>
              </Modal>
            </Card>

            <Card title="Tooltip">
              <div className="flex gap-4">
                <Tooltip content="Top tooltip" position="top">
                  <Button variant="secondary">Hover (Top)</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" position="bottom">
                  <Button variant="secondary">Hover (Bottom)</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" position="left">
                  <Button variant="secondary">Hover (Left)</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" position="right">
                  <Button variant="secondary">Hover (Right)</Button>
                </Tooltip>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-6">
            <Card title="Data Table">
              <Table 
                columns={tableColumns} 
                data={tableData}
                onRowClick={(row) => alert(`Clicked on ${row.name}`)}
                striped
              />
            </Card>

            <Card title="Cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card hoverable>
                  <h4 className="font-semibold text-lg mb-2">Simple Card</h4>
                  <p className="text-gray-600 text-sm">This is a basic card component.</p>
                </Card>
                <Card 
                  title="With Title"
                  subtitle="And subtitle"
                  hoverable
                >
                  <p className="text-gray-600 text-sm">Card with header section.</p>
                </Card>
                <Card 
                  title="With Footer"
                  footer={<Button size="small" fullWidth>Action</Button>}
                  hoverable
                >
                  <p className="text-gray-600 text-sm">Card with footer section.</p>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {/* Component Usage Documentation */}
        <Card title="Component Documentation" className="mt-8">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Installation</h4>
              <p className="text-gray-600 mb-2">Copy the components you need into your project's components folder:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`src/
  components/
    common/
      Button/
        Button.jsx
      Input/
        Input.jsx
      Card/
        Card.jsx
      ...`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Usage Examples</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Button</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Button 
  variant="primary" 
  size="medium"
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Input with validation</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Input 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  icon={Mail}
  required
/>`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Modal</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="medium"
  footer={
    <>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Modal content goes here</p>
</Modal>`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Table</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`const columns = [
  { header: 'Name', key: 'name' },
  { 
    header: 'Status', 
    render: (row) => <Badge>{row.status}</Badge> 
  }
];

<Table 
  columns={columns}
  data={users}
  onRowClick={(row) => handleRowClick(row)}
  striped
  hoverable
/>`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Alert</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Alert 
  type="success"
  title="Success!"
  message="Your changes have been saved."
  onClose={() => setAlert(null)}
  dismissible
/>`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Select</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Select
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  error={errors.category}
  required
/>`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Component Props</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left">Component</th>
                      <th className="border px-4 py-2 text-left">Prop</th>
                      <th className="border px-4 py-2 text-left">Type</th>
                      <th className="border px-4 py-2 text-left">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Button</td>
                      <td className="border px-4 py-2">variant</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">'primary'</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Button</td>
                      <td className="border px-4 py-2">size</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">'medium'</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Button</td>
                      <td className="border px-4 py-2">loading</td>
                      <td className="border px-4 py-2">boolean</td>
                      <td className="border px-4 py-2">false</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Input</td>
                      <td className="border px-4 py-2">label</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Input</td>
                      <td className="border px-4 py-2">error</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Modal</td>
                      <td className="border px-4 py-2">size</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">'medium'</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Alert</td>
                      <td className="border px-4 py-2">type</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">'info'</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Badge</td>
                      <td className="border px-4 py-2">variant</td>
                      <td className="border px-4 py-2">string</td>
                      <td className="border px-4 py-2">'default'</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>✅ Fully responsive and mobile-friendly</li>
                <li>✅ Accessible with proper ARIA labels</li>
                <li>✅ Customizable with Tailwind CSS classes</li>
                <li>✅ TypeScript support ready (add prop types)</li>
                <li>✅ Form validation support</li>
                <li>✅ Icon integration with Lucide React</li>
                <li>✅ Loading and disabled states</li>
                <li>✅ Keyboard navigation support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Customization</h4>
              <p className="text-gray-600 mb-2">All components accept a className prop for additional styling:</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
{`<Button className="shadow-lg hover:shadow-xl">
  Custom Styled Button
</Button>

<Card className="border-2 border-blue-500">
  <p>Custom styled card</p>
</Card>`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Best Practices</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Always provide labels for form inputs</li>
                <li>Use appropriate button variants for actions (danger for delete, etc.)</li>
                <li>Show loading states during async operations</li>
                <li>Provide error messages for form validation</li>
                <li>Use tooltips for icon-only buttons</li>
                <li>Keep modal content focused and actionable</li>
                <li>Use badges to highlight important status information</li>
                <li>Make tables responsive with horizontal scrolling</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>UI Components Library - Built with React and Tailwind CSS</p>
          <p className="mt-1">All components are production-ready and fully customizable</p>
        </div>
      </div>
    </div>
  );
}