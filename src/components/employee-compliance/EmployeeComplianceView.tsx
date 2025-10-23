  const EmployeeComplianceView = () => {
    const getExpirationStatus = (expiresDate: string) => {
      const daysUntilExpiration = Math.floor((new Date(expiresDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiration < 0) return 'expired';
      if (daysUntilExpiration <= 30) return 'expiring-soon';
      if (daysUntilExpiration <= 90) return 'expiring-warning';
      return 'active';
    };

    const filteredLicenses = selectedState === 'ALL' ? licenses : licenses.filter(l => l.state === selectedState);
    const filteredBonds = selectedState === 'ALL' ? bonds : bonds.filter(b => b.state === selectedState);

    // Group by employee
    const employeeMap = new Map<string, { name: string, licenses: License[], bonds: Bond[] }>();
    filteredLicenses.forEach(license => {
      const key = license.assignedTo._id;
      if (!employeeMap.has(key)) {
        employeeMap.set(key, {
          name: `${license.assignedTo.firstName} ${license.assignedTo.lastName}`,
          licenses: [],
          bonds: []
        });
      }
      employeeMap.get(key)!.licenses.push(license);
    });
    filteredBonds.forEach(bond => {
      const key = bond.assignedTo._id;
      if (!employeeMap.has(key)) {
        employeeMap.set(key, {
          name: `${bond.assignedTo.firstName} ${bond.assignedTo.lastName}`,
          licenses: [],
          bonds: []
        });
      }
      employeeMap.get(key)!.bonds.push(bond);
    });

    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Employee Compliance Tracking</h2>
            <p className="text-gray-400">Track licenses, bonds, and certifications by employee and state</p>
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name} ({state.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#0f1823] border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{employeeMap.size}</p>
              <p className="text-xs text-gray-500">With compliance records</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1823] border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Active Licenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-400">{filteredLicenses.filter(l => l.isActive).length}</p>
              <p className="text-xs text-gray-500">Currently valid</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1823] border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-400">
                {filteredLicenses.filter(l => getExpirationStatus(l.expiresDate) === 'expiring-soon').length}
              </p>
              <p className="text-xs text-gray-500">Within 30 days</p>
            </CardContent>
          </Card>
          <Card className="bg-[#0f1823] border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-400">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-400">
                {filteredLicenses.filter(l => getExpirationStatus(l.expiresDate) === 'expired').length}
              </p>
              <p className="text-xs text-gray-500">Requires renewal</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Compliance Cards */}
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-4">
            {Array.from(employeeMap.entries()).map(([id, employee]) => (
              <Card key={id} className="bg-[#0f1823] border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {employee.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-600/20 text-blue-400">
                        {employee.licenses.length} Licenses
                      </Badge>
                      <Badge className="bg-purple-600/20 text-purple-400">
                        {employee.bonds.length} Bonds
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="licenses" className="w-full">
                    <TabsList className="bg-gray-800 border-gray-700">
                      <TabsTrigger value="licenses" className="text-gray-400 data-[state=active]:text-white">
                        Licenses ({employee.licenses.length})
                      </TabsTrigger>
                      <TabsTrigger value="bonds" className="text-gray-400 data-[state=active]:text-white">
                        Bonds ({employee.bonds.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="licenses" className="space-y-3 mt-4">
                      {employee.licenses.map(license => {
                        const status = getExpirationStatus(license.expiresDate);
                        return (
                          <div key={license._id} className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-white font-medium">{license.name}</p>
                                <p className="text-xs text-gray-500">{license.type} - {license.licenseNumber}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className="bg-purple-600/20 text-purple-400">{license.state}</Badge>
                                {status === 'expired' && <Badge className="bg-red-600/20 text-red-400">Expired</Badge>}
                                {status === 'expiring-soon' && <Badge className="bg-yellow-600/20 text-yellow-400">Expiring Soon</Badge>}
                                {status === 'active' && <Badge className="bg-green-600/20 text-green-400">Active</Badge>}
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Issued: {new Date(license.issuedDate).toLocaleDateString()}</span>
                              <span>Expires: {new Date(license.expiresDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        );
                      })}
                      {employee.licenses.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No licenses found</p>
                      )}
                    </TabsContent>

                    <TabsContent value="bonds" className="space-y-3 mt-4">
                      {employee.bonds.map(bond => {
                        const status = getExpirationStatus(bond.expiresDate);
                        return (
                          <div key={bond._id} className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-white font-medium">{bond.name}</p>
                                <p className="text-xs text-gray-500">{bond.bondNumber} - ${bond.amount.toLocaleString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge className="bg-purple-600/20 text-purple-400">{bond.state}</Badge>
                                {status === 'expired' && <Badge className="bg-red-600/20 text-red-400">Expired</Badge>}
                                {status === 'expiring-soon' && <Badge className="bg-yellow-600/20 text-yellow-400">Expiring Soon</Badge>}
                                {status === 'active' && <Badge className="bg-green-600/20 text-green-400">Active</Badge>}
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Issued: {new Date(bond.issuedDate).toLocaleDateString()}</span>
                              <span>Expires: {new Date(bond.expiresDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        );
                      })}
                      {employee.bonds.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No bonds found</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
            {employeeMap.size === 0 && (
              <Card className="bg-[#0f1823] border-gray-800">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No employee compliance records found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Company Compliance View
  const CompanyComplianceView = () => (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Company Compliance (CCS Corporate)</h2>
      <Card className="bg-[#0f1823] border-gray-800">
        <CardContent className="p-12 text-center">
          <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Company-level compliance tracking coming soon</p>
          <p className="text-sm text-gray-500">Track CCS corporate licenses, bonds, and registrations by state</p>
        </CardContent>
      </Card>
    </div>
  );

  const StatesView = () => <div className="p-6"><h2 className="text-3xl font-bold text-white">States View - Coming Soon</h2></div>;
  const SearchRulesView = () => <div className="p-6"><h2 className="text-3xl font-bold text-white">Search Rules - Coming Soon</h2></div>;
  const CompareStatesView = () => <div className="p-6"><h2 className="text-3xl font-bold text-white">Compare States - Coming Soon</h2></div>;
  const SystemReportsView = () => <div className="p-6"><h2 className="text-3xl font-bold text-white">System Reports - Coming Soon</h2></div>;

  return (
    <div className="flex h-screen bg-[#1a2332]">
